import { Suspense, useContext } from "react";
import { AuthContext } from "../../App";
function ChatMessage({ value, uid, photoURL, type }) {
  const auth = useContext(AuthContext);
  return (
    <div
      className={`message ${
        uid === auth.currentUser.uid ? "sent" : "received"
      }`}
    >
      <Suspense fallback={<div className="spinner small"></div>}>
        <img
          src={photoURL}
          className="user"
          alt="USER IMAGE"
          referrerPolicy="no-referrer"
        />
      </Suspense>
      {type === "text" ? (
        <p>{value}</p>
      ) : (
        <img src={value} loading="lazy" className="messageImg" alt="Image" />
      )}
    </div>
  );
}
export default ChatMessage;
