import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// 전역 변수
const djangoServerUrl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app';

// axios 기본 설정
axios.defaults.withCredentials = true;

// App 컴포넌트
const Test = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [userId, setUserId] = useState(null);

  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const jwtToken = Cookies.get('jwtToken');
  const jwtRefreshToken = Cookies.get('jwtRefreshToken');

  if (!jwtToken || !jwtRefreshToken) {
    console.error('Tokens are missing');
    return;
  }


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://port-0-travelproject-9zxht12blqj9n2fu.sel4.cloudtype.app/travel-user/reading', {
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
        setError("사용자 정보를 가져오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);


  // useEffect(() => {
  //   if (currentUser) {
  //     loadChatRooms();
  //   }
  // }, [currentUser]);

  // const loadChatRooms = async () => {
  //   try {
  //     const response = await axios.get(`${djangoServerUrl}/chat/rooms/?travel_user_id=${currentUser.id}`);
  //     const rooms = response.data;
  //     rooms.sort((a, b) => new Date(b.latest_message_timestamp) - new Date(a.latest_message_timestamp));
  //     setChatRooms(rooms);
  //   } catch (error) {
  //     console.error('Error in loadChatRooms:', error);
  //   }
  // };

  const createUser = async () => {
    try {
      const response = await axios.post(`${djangoServerUrl}/users/`, {
        jwtToken: jwtToken,
        jwtRefreshToken: jwtRefreshToken
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setUserId(response.data.id);
      console.log('User created with ID:', response.data.id);
    } catch (error) {
      console.error('Error creating user:', error.response?.data, error.response?.status);
      if (error.response) {
        console.log(error.response.headers);
        console.log(error.response);
      }
    }
  };

  return (
    <div>
      {!currentUser ? (
        <div>
          <Login setCurrentUser={setCurrentUser} />
          <button onClick={createUser}>Create New User</button>
          {userId && <p>Created User ID: {userId}</p>}
        </div>
      ) : !currentRoomId ? (
        <ChatList 
          chatRooms={chatRooms} 
          setCurrentRoomId={setCurrentRoomId} 
        />
      ) : (
        <ChatRoom 
          roomId={currentRoomId} 
          currentUser={currentUser}
          setCurrentRoomId={setCurrentRoomId}
        />
      )}
    </div>
  );
};

// Login 컴포넌트
const Login = ({ setCurrentUser }) => {
  const [travelUserId, setTravelUserId] = useState('');
  const [gender, setGender] = useState('O');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${djangoServerUrl}/chat/login/`, {
        travel_user_id: travelUserId,
        gender: gender,
      });
      const userData = response.data;
      setCurrentUser({ id: userData.travel_user_id, gender: userData.gender });
    } catch (error) {
      console.error('Error in loginAsUser:', error);
      setLoginError(error.response?.data?.error || 'Login failed.');
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={travelUserId} 
        onChange={(e) => setTravelUserId(e.target.value)} 
        placeholder="Enter your travel user ID"
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="O">Other</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <button onClick={handleLogin}>Login</button>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

// ChatList 컴포넌트
const ChatList = ({ chatRooms, setCurrentRoomId }) => {
  return (
    <div>
      <h2>Chat Rooms</h2>
      {chatRooms.map(room => (
        <div key={room.id} onClick={() => setCurrentRoomId(room.id)}>
          Room {room.id} - {room.room_name}: 
          {room.latest_message ? 
            `${room.latest_message} (${new Date(room.latest_message_timestamp).toLocaleString()})` : 
            'No messages yet'}
        </div>
      ))}
    </div>
  );
};

// ChatRoom 컴포넌트
const ChatRoom = ({ roomId, currentUser, setCurrentRoomId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [usersInRoom, setUsersInRoom] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    loadMessages();
    setupWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [roomId]);

  const loadMessages = async () => {
    try {
      const response = await axios.get(`${djangoServerUrl}/chat/${roomId}/messages/`);
      setMessages(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        console.log(`No messages found for room ${roomId}`);
        setMessages([]);
      } else {
        console.error('Error loading messages:', error);
      }
    }
  };

  const setupWebSocket = () => {
    socketRef.current = new WebSocket(`wss://127.0.0.1:8001/ws/chat/${roomId}/`);
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      } else if (data.type === 'participants') {
        setUsersInRoom(data.participants);
      }
    };
  };

  const sendMessage = () => {
    if (inputMessage && socketRef.current) {
      socketRef.current.send(JSON.stringify({
        'sender_id': currentUser.id,
        'message': inputMessage,
        'type': 'message'
      }));
      setInputMessage('');
    }
  };

  const leaveRoom = () => {
    setCurrentRoomId(null);
  };

  return (
    <div>
      <h2>Chat Room 맞아? {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender.travel_user_id}: {msg.text} ({new Date(msg.timestamp).toLocaleString()})
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={inputMessage} 
        onChange={(e) => setInputMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send</button>
      <button onClick={leaveRoom}>Leave Room</button>
      <div>
        <h3>Users in Room:</h3>
        {usersInRoom.map(user => (
          <div key={user.travel_user_id}>{user.travel_user_id}</div>
        ))}
      </div>
    </div>
  );
};

export default Test;
