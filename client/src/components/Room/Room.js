import Video from "./Video";
import Messages from "./Messages";
import Header from "../Header/Header";

import { useState } from "react";
import MembersContainer from "./MembersContainer";

function Room(props) {
  const {
    users,
    tracks,
    userName,
    roomId,
    rtmClient,
    testChannel,
    uid,
    client,
  } = props;

  //scroll messages into view - doesn't work yet
  //let messagesContainer = document.getElementById("messages");
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;

  //show and hide members container (left container)
  const [memberContainer, setMemberContainer] = useState(true);
  function handleMemberContainer() {
    setMemberContainer(!memberContainer);
  }

  //show and hide chat panel (right container)
  const [chatPanel, setChatPanel] = useState(true);
  function handleChatPanel() {
    setChatPanel(!chatPanel);
  }

  return (
    <div className="RoomMain">
      <Header ></Header>
      <main className="container">
        <div id="room__container">
          <Video tracks={tracks} users={users} />

          <Messages
            tracks={tracks}
            users={users}
            userName={userName}
            chatPanel={chatPanel}
            roomId={roomId}
            rtmClient={rtmClient}
            testChannel={testChannel}
            uid={client.uid}
          />

          {/* bot messages? */}
          {/* 
            <div id="messages">
              <div className="message__wrapper">
              <div className="message__body__bot">
                <strong className="message__author__bot">🤖 Mumble Bot</strong>
                <p className="message__text__bot">
                  Welcome to the room, Don't be shy, say hello!
                </p>
              </div>
            </div> */}
        </div>
      </main>
    </div>
  );
}

export default Room;
