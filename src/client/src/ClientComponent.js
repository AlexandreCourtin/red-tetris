import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export default function ClientComponent() {
  const [response, setResponse] = useState("");

  let roomName = checkNameAndRoomValidity(window.location.hash.substring(
    window.location.hash.lastIndexOf("#") + 1,
    window.location.hash.lastIndexOf("[")
  ));

  let playerName = checkNameAndRoomValidity(window.location.hash.substring(
    window.location.hash.lastIndexOf("[") + 1,
    window.location.hash.lastIndexOf("]")
  ));

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <p>room name: {roomName}</p>
      <p>player name: {playerName}</p>
    </div>
  );
}

function checkNameAndRoomValidity(s) {
  if (s.includes("#") || s.includes("[") || s.includes("]")) {
    return "error";
  } else {
    return s;
  }
}