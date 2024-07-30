import React, { useState, useEffect, useRef } from 'react';

// 웹소켓 기본 URL 설정
const baseWebSocketUrl = 'ws://svc.sel4.cloudtype.app:8001/ws/friend/';

const FriendManagement = () => {
  // 상태 변수들 정의
  const [status, setStatus] = useState('');
  const [travelUserId, setTravelUserId] = useState('');
  const [friendTravelId, setFriendTravelId] = useState('');
  const socketRef = useRef(null);
  const [isSocketReady, setIsSocketReady] = useState(false);

  // 웹소켓 연결 설정
  useEffect(() => {
    if (travelUserId) {
      const websocketUrl = `${baseWebSocketUrl}${travelUserId}/`;
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
  }, [travelUserId]);

  // 서버로부터 받은 메시지 처리
  const handleServerMessage = (data) => {
    console.log('서버 메시지:', data);
    setStatus(`서버 응답: ${JSON.stringify(data)}`);
  };

  // 웹소켓을 통해 메시지 전송
  const sendWebSocketMessage = (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
      console.log('웹소켓 메시지 전송:', message);
    } else {
      console.log('웹소켓이 열려있지 않습니다. 메시지를 보낼 수 없습니다.');
      setStatus('웹소켓 연결이 되지 않았습니다. 사용자 ID를 입력하고 연결을 확인해주세요.');
    }
  };

  // 친구 수락
  const acceptFriend = () => {
    sendWebSocketMessage({
      type: "friend_accept",
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    });
  };

  // 친구 대기
  const standbyFriend = () => {
    sendWebSocketMessage({
      type: "friend_standby",
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    });
  };

  // 친구 거절
  const refuseFriend = () => {
    sendWebSocketMessage({
      type: "friend_refuse",
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    });
  };

  // 친구 차단
  const blockFriend = () => {
    sendWebSocketMessage({
      type: "friend_block",
      travel_id: parseInt(travelUserId),
      friend_travel_id: parseInt(friendTravelId)
    });
  };

  return (
    <div>
      <h1>친구 관리</h1>
      {/* 사용자 ID 입력 필드 */}
      <input
        type="number"
        value={travelUserId}
        onChange={(e) => setTravelUserId(e.target.value)}
        placeholder="사용자 ID 입력"
      />
      {/* 친구 ID 입력 필드 */}
      <input
        type="number"
        value={friendTravelId}
        onChange={(e) => setFriendTravelId(e.target.value)}
        placeholder="친구 ID 입력"
      />
      {/* 웹소켓 연결 상태 표시 */}
      <p>상태: {isSocketReady ? '연결됨' : '연결되지 않음'}</p>
      {/* 서버 응답 표시 */}
      <p>서버 응답: {status}</p>

      <h2>친구 관련 동작</h2>
      {/* 친구 관련 동작 버튼들 */}
      <button onClick={acceptFriend}>친구 수락</button>
      <button onClick={standbyFriend}>친구 대기</button>
      <button onClick={refuseFriend}>친구 거절</button>
      <button onClick={blockFriend}>친구 차단</button>
    </div>
  );
};

export default FriendManagement;