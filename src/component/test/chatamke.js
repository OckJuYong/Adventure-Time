import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const apiUrl = 'https://port-0-travelproject-umnqdut2blqqevwyb.sel4.cloudtype.app/chat/rooms/';
const baseWebSocketUrl = 'ws://svc.sel4.cloudtype.app:8001/ws/chat/';

const CreateChatRoom = () => {
  // 상태 변수들 정의
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState('');
  const [roomId, setRoomId] = useState(null);
  const socketRef = useRef(null);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');

  // 웹소켓 연결 설정
  useEffect(() => {
    if (roomId) {
      const websocketUrl = `${baseWebSocketUrl}${roomId}/`;
      socketRef.current = new WebSocket(websocketUrl);

      // 웹소켓 연결 완료 시 호출
      socketRef.current.onopen = () => {
        console.log('웹소켓 연결 완료');
        setIsSocketReady(true);
      };

      // 서버로부터 메시지 수신 시 호출
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('웹소켓 메시지 수신:', data);
        handleServerMessage(data);
      };

      // 웹소켓 오류 발생 시 호출
      socketRef.current.onerror = (error) => {
        console.error('웹소켓 오류:', error);
        setIsSocketReady(false);
      };

      // 웹소켓 연결 종료 시 호출
      socketRef.current.onclose = () => {
        console.log('웹소켓 연결 종료');
        setIsSocketReady(false);
      };

      // 컴포넌트 언마운트 시 웹소켓 연결 종료
      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [roomId]);

  // 서버로부터 받은 메시지 처리
  const handleServerMessage = (data) => {
    console.log('서버로부터 받은 메시지:', data);
    switch (data.type) {
      case 'left':
        console.log(`사용자가 방 ${data.room_id}에서 퇴장했습니다`);
        break;
      case 'message':
        console.log(`메시지 수신: ${data.message}`);
        break;
      case 'room_created':
        console.log(`방 생성 확인: ${data.room_name} (ID: ${data.room_id})`);
        break;
      case 'invite_response':
        console.log(`초대 응답: ${data.status}`);
        break;
      case 'travel_request_response':
        console.log(`여행 요청 응답: ${data.status}`);
        break;
      case 'room_update':
        console.log(`방 정보 업데이트: ${JSON.stringify(data.room_info)}`);
        break;
      case 'participants_update':
        console.log(`참가자 정보 업데이트: ${JSON.stringify(data.participants)}`);
        break;
      default:
        console.log('처리되지 않은 메시지 유형:', data.type);
    }
  };

  // 웹소켓을 통해 메시지 전송
  const sendWebSocketMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log('웹소켓 메시지 전송:', message);
    } else {
      console.log('웹소켓이 열려있지 않습니다. 메시지를 보낼 수 없습니다.');
    }
  };

  // 채팅방 생성
  const createRoom = async () => {
    if (roomName) {
      try {
        const response = await axios.post(apiUrl, {
          room_name: roomName,
          users: [
            { travel_user_id: 1 },
            { travel_user_id: 3 }
          ]
        });

        const createdRoomId = response.data.id;
        setRoomId(createdRoomId);

        console.log('방 생성 성공:', response.data);
        setStatus('방이 성공적으로 생성되었습니다!');

        // 웹소켓 연결
        const websocketUrl = `${baseWebSocketUrl}${createdRoomId}/`;
        socketRef.current = new WebSocket(websocketUrl);

        socketRef.current.onopen = () => {
          console.log('웹소켓 연결 완료');
          setIsSocketReady(true);
          
          // 방 생성 메시지 전송
          sendWebSocketMessage({
            type: "room_created",
            sender_id: 1,
            room_name: roomName
          });
        };

        // 다른 웹소켓 이벤트 핸들러 설정...

      } catch (error) {
        console.error('방 생성 오류:', error.response?.data || error.message);
        setStatus('방 생성 중 오류가 발생했습니다.');
      }
    } else {
      setStatus('방 이름을 입력해주세요.');
    }
  };

  // 사용자 초대
  const inviteUser = () => {
    if (inviteEmail && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      sendWebSocketMessage({
        type: 'invite',
        user_email: inviteEmail
      });
      console.log(`${inviteEmail}에게 초대장 전송`);
      setStatus(`${inviteEmail}에게 초대장을 보냈습니다. 응답 대기 중...`);
      setInviteEmail('');
    } else {
      setStatus('이메일을 입력하고 방이 생성되었는지 확인해주세요.');
    }
  };

  // 채팅방 퇴장
  const leaveRoom = () => {
    sendWebSocketMessage({
      type: "leave",
      sender_id: 1,
      room_id: roomId
    });
    setStatus('방 퇴장 요청을 보냈습니다. 응답 대기 중...');
  };

  // 메시지 전송
  const sendMessage = () => {
    sendWebSocketMessage({
      type: "message",
      sender_id: 1,
      message: message
    });
    setMessage('');
    setStatus('메시지를 전송했습니다.');
  };

  // 여행 요청 전송
  const sendTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_request",
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 보냈습니다. 응답 대기 중...');
  };

  // 여행 요청 수락
  const acceptTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_response",
      accepted: true,
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 수락했습니다. 응답 대기 중...');
  };

  // 여행 요청 거절
  const rejectTravelRequest = () => {
    sendWebSocketMessage({
      type: "travel_response",
      accepted: false,
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId),
      room_name: roomName
    });
    setStatus('여행 요청을 거절했습니다. 응답 대기 중...');
  };

  // 방 정보 업데이트 요청
  const requestRoomUpdate = () => {
    sendWebSocketMessage({
      type: "room_update",
      room_id: roomId
    });
    setStatus('방 정보 업데이트를 요청했습니다. 응답 대기 중...');
  };

  // 참가자 정보 업데이트 요청
  const requestParticipantsUpdate = () => {
    sendWebSocketMessage({
      type: "participants_update",
      sender_id: 1
    });
    setStatus('참가자 정보 업데이트를 요청했습니다. 응답 대기 중...');
  };

  // 여행 요청 별도 거절
  const rejectTravelRequestSeparate = () => {
    sendWebSocketMessage({
      type: "travel_request_rejected",
      sender_travel_user_id: 1,
      recipient_travel_user_id: parseInt(recipientId)
    });
    setStatus('여행 요청을 별도로 거절했습니다. 응답 대기 중...');
  };

  return (
    <div>
      {/* 채팅방 생성 UI */}
      <h1>새로운 채팅방 만들기</h1>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="방 이름 입력"
      />
      <button onClick={createRoom}>방 만들기</button>
      <p>상태: {status}</p>

      {/* 사용자 초대 UI */}
      <h2>사용자 초대</h2>
      <input
        type="email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        placeholder="사용자 이메일 입력"
      />
      <button onClick={inviteUser}>사용자 초대</button>

      {/* 채팅방 동작 UI */}
      <h2>채팅방 동작</h2>
      <button onClick={leaveRoom}>방 나가기</button>
      
      {/* 메시지 전송 UI */}
      <h2>메시지 보내기</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 입력"
      />
      <button onClick={sendMessage}>메시지 보내기</button>

      {/* 여행 관련 동작 UI */}
      <h2>여행 관련 동작</h2>
      <input
        type="number"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="수신자 ID"
      />
      <button onClick={sendTravelRequest}>여행 요청 보내기</button>
      <button onClick={acceptTravelRequest}>여행 요청 수락</button>
      <button onClick={rejectTravelRequest}>여행 요청 거절</button>
      <button onClick={rejectTravelRequestSeparate}>여행 요청 거절 (별도)</button>

      {/* 방 관련 동작 UI */}
      <h2>방 관련 동작</h2>
      <button onClick={requestRoomUpdate}>방 정보 업데이트 요청</button>
      <button onClick={requestParticipantsUpdate}>참가자 정보 업데이트 요청</button>
    </div>
  );
};

export default CreateChatRoom;