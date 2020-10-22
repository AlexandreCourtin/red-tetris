import React, { useState } from "react";
import ClientComponent from "./ClientComponent";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        STOP CLIENT
      </button>
      {loadClient ? <ClientComponent /> : null}
    </>
  );
}

export default App;