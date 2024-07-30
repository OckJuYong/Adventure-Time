import React from 'react';

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
  export default ChatList;