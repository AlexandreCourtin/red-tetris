import React, { useEffect, useState } from "react";
import axios from 'axios';
import socketIOClient from "socket.io-client";
const SERVERPATH = "http://127.0.0.1:4001";

export default function ClientComponent() {
  const [response, setResponse] = useState("");

  let clientRoomName = checkNameAndRoomValidity(window.location.hash.substring(
    window.location.hash.lastIndexOf("#") + 1,
    window.location.hash.lastIndexOf("[")
  ));

  let clientPlayerName = checkNameAndRoomValidity(window.location.hash.substring(
    window.location.hash.lastIndexOf("[") + 1,
    window.location.hash.lastIndexOf("]")
  ));

  axios.get(SERVERPATH + "/update",
    { params: { playerName: clientPlayerName, roomName: clientRoomName } }
  );

  useEffect(() => {
    const socket = socketIOClient(SERVERPATH);
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
      <p>room name: {clientRoomName}</p>
      <p>player name: {clientPlayerName}</p>
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