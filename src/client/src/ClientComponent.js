import React, { useEffect, useState } from "react";
import axios from 'axios';
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

  await axios.get("http://127.0.0.1:4001/addplayer",
    { params: { playerName: 'bruno', roomName: 'baba' } }
  );

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
  if (s == null) {
    return "error";
  } else if (s.includes("#") || s.includes("[") || s.includes("]")) {
    return "error";
  } else {
    return s;
  }
}