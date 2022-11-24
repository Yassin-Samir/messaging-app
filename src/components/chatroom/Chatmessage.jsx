import { Suspense, useContext } from "react";
import { Context } from "../../App";
export default function ChatMessage({ text, uid, photoURL }) {
  const auth = useContext(Context);
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
