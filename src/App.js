import React, { useState, useEffect, useRef } from "react";
import NavBar from "./Components/NavBar";
import Text from "./Components/Text";
import Chat from "./chat.json";
import Input from "./Components/Input";
export default function App() {
  const [textMessage, setTextMessage] = useState([]);
  const scrollableContainerRef = useRef();
  const getText = (txt) => {
    setTextMessage((prev) => [
      ...prev,
      {
        sender: "user",
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
        message: txt,
      },
    ]);

    setTimeout(() => {
      setTextMessage((prev) => {
        return [
          ...prev,
          {
            sender: "assistant",
            timestamp: "",
            message: ". . .",
          },
        ];
      });
    }, 1000);

    setTimeout(() => {
      setTextMessage((prev) => {
        const updatedMessages = prev.filter((msg) => msg.message !== ". . .");

        return [
          ...updatedMessages,
          {
            sender: "assistant",
            timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
            message:
              Chat.chat[Math.floor(Math.random() * Chat.chat.length)].message,
          },
        ];
      });
    }, 3000);
  };

  useEffect(() => {
    scrollableContainerRef.current.scrollTop =
      scrollableContainerRef.current.scrollHeight;
  }, [textMessage]);

  function timeFormat(time, txt) {
    if (txt === ". . .") {
      return "";
    } else {
      return new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
  }
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div
        className="container col-12 col-xxl-8 p-0 "
        style={{ backgroundColor: "#FFEEDD" }}
      >
        <div
          ref={scrollableContainerRef}
          className=" my-0 w-100 px-2"
          style={{ height: "80vh", overflowY: "auto" }}
        >
          {textMessage.map((chat, id) =>
            chat.sender === "assistant" ? (
              <div key={id} className="d-flex  justify-content-start mb-2">
                <Text
                  text={chat.message}
                  time={timeFormat(chat.timestamp, chat.message)}
                />
              </div>
            ) : (
              <div key={id} className="d-flex justify-content-end mb-2">
                <Text
                  text={chat.message}
                  user={chat.sender}
                  time={timeFormat(chat.timestamp)}
                />
              </div>
            )
          )}
        </div>

        <div>
          <Input sendMessage={getText} />
        </div>
      </div>
    </>
  );
}
