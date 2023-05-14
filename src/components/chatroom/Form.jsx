import {
  useState,
  useContext,
  useCallback,
  memo,
  useDeferredValue,
  useEffect,
} from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../App";
function Form({ messagesRef }) {
  const [message, setMessage] = useState("");
  const auth = useContext(AuthContext);
  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      try {
        setMessage("");
        addDoc(messagesRef, {
          text: message,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        });
      } catch (error) {
        alert("failed to send your message please try again");
      }
    },
    [message, auth]
  );
  const handleChange = useCallback(
    ({ target: { value } }) => setMessage(value),
    []
  );
  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        placeholder="Write a message"
        onChange={handleChange}
      />
      <button disabled={!message} type="submit">
        send
      </button>
    </form>
  );
}
export default memo(Form);
