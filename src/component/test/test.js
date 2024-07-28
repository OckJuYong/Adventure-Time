import React, { useState, useEffect, useRef } from 'react';

// App 컴포넌트
const Test = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [userId, setUserId] = useState(null);  // 새로운 상태 추가

  useEffect(() => {
    if (currentUser) {
      loadChatRooms();
    }
  }, [currentUser]);

  const loadChatRooms = async () => {
    try {
      const response = await fetch(`${djangoServerUrl}/chat/rooms/?travel_user_id=${currentUser.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const rooms = await response.json();
      rooms.sort((a, b) => new Date(b.latest_message_timestamp) - new Date(a.latest_message_timestamp));
      setChatRooms(rooms);
    } catch (error) {
      console.error('Error in loadChatRooms:', error);
    }
  };

  // 새로운 함수 추가
  const createUser = async () => {
    try {
      const response = await fetch('https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 빈 객체를 보냅니다. 아무 정보도 보내지 않습니다.
        body: JSON.stringify({})
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUserId(data.id);  // 서버에서 반환한 사용자 ID를 저장
      console.log('User created with ID:', data.id);
    } catch (error) {
      console.error('Error creating user:', error);
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
      const response = await fetch(`${djangoServerUrl}/chat/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ travel_user_id: travelUserId, gender })
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.error || 'Login failed.');
        return;
      }

      const userData = await response.json();
      setCurrentUser({ id: userData.travel_user_id, gender: userData.gender });
    } catch (error) {
      console.error('Error in loginAsUser:', error);
      setLoginError('An unexpected error occurred.');
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
      const response = await fetch(`${djangoServerUrl}/chat/${roomId}/messages/`);
      if (response.status === 404) {
        console.log(`No messages found for room ${roomId}`);
        setMessages([]);
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const messagesData = await response.json();
        setMessages(messagesData);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
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

// 전역 변수
const djangoServerUrl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app';

export default Test;