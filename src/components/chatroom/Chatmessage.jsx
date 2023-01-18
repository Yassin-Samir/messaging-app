import {  Suspense, useContext } from "react";
import { AuthContext } from "../../App";
function ChatMessage({ text, uid, photoURL }) {
  const auth = useContext(AuthContext);
  return (
    <div
      className={`message ${
        uid === auth.currentUser.uid ? "sent" : "received"
      }`}
    >
      <Suspense fallback={<div className="spinner small"></div>}>
        <img src={photoURL} alt="USER IMAGE" />
      </Suspense>
      <p>{text}</p>
    </div>
  );
}
export default ChatMessage;
