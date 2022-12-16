import React from "react";
import { useState, useEffect } from "react";

import { RtmMessage } from "agora-rtm-react";
import Send from "../../resources/icons/send.svg";
import Avatar from "../../resources/avatar.jpg";

// import { text } from "stream/consumers";

function Messages(props: any) {
  const {
    users,
    tracks,
    userName,
    chatPanel,
    roomId,
    rtmClient,
    testChannel,
    uid,
  } = props;

  //scroll messages into view - doesn't work yet
  //let messagesContainer = document.getElementById("messages");
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const [texts, setTexts] = useState<messageStore[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  // let logout = async () => {
  //   await testChannel.leave();
  //   await rtmClient.logout();
  //   testChannel.removeAllListeners();
  //   rtmClient.removeAllListeners();
  // };

  //messages keep doubling
  useEffect(() => {
    testChannel.on("ChannelMessage", (msg: any, uid: any) => {
      setTexts((previous) => {
        //preventing doubled received messages
        if (previous.length > 0) {
          if (
            previous[previous.length - 1].uid === uid &&
            previous[previous.length - 1].msg === msg
          ) {
            return [...previous];
          } else {
            return [...previous, { msg, uid }];
          }
        } else {
          return [...previous, { msg, uid }];
        }
      });
    });

    // testChannel.on("MemberJoined", (msg: any, uid: any) => {
    //   setTexts((previous) => {
    //     return [...previous, { msg, uid }];
    //   });
    // });
  }, []);

  const sendMsg = async (e: React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();

    let message = rtmClient.createMessage({ text, messageType: "TEXT" });
    await testChannel.sendMessage(message);

    setTexts((previous) => {
      return [...previous, { msg: { text }, uid }];
    });

    setTextInput("");
  };

  const getMsg = (msg: any) => {
    if (msg.messageType === "TEXT" || msg.messageType === undefined) {
      return msg.text;
    } else {
      return "Nieobsługiwany typ wiadomości";
    }
  };

  return (
    <div className="Messages">
      {/* MESSAGES CONTAINER */}
      <h2>Wiadomości</h2>
      <section
        id="messages__container"
        className={chatPanel ? "messages__container__hidden" : undefined}
      >
        <div id="messages">
          {texts.map((text: messageStore, i) => (
            <div key={i} className={ (text.uid === uid) ? "author message__wrapper" : "message__wrapper" }>
              <div className="message__body">
                <p className="message__text">{getMsg(text.msg)}</p>
                {/* TODO GET AVATAR FROM USER */}
                <img className="message__avatar" src={Avatar} alt="avatar" />
              </div>
            </div>
          ))}
        </div>

        <form
          id="message__form"
          onSubmit={(e) => {
            sendMsg(e, textInput);
          }}
        >
          <input
            id="message__input"
            type="text"
            name="message"
            placeholder="Napisz wiadomość..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />

          <button
            id="message__submit"
            type="submit"
          >
            <img src={Send} alt="send" />
          </button>
        </form>
      </section>
    </div>
  );
}

// if doesn't work
// remember
// you changed the RtmMessage type
// type RtmMessage =
//   | RtmTextMessage
//   | RtmRawMessage;

export type messageStore = {
  msg: RtmMessage;
  uid: string;
};

export default Messages;
