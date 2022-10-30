import "./css/App.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Signin from "./components/signin";
import Signout from "./components/signout";
import Chatroom from "./components/chatroom";
const app = initializeApp({
  apiKey: "AIzaSyBv3Clx3Z8YCBxtqe89efAbsBlhtAjeavg",
  authDomain: "messaging-app-98837.firebaseapp.com",
  projectId: "messaging-app-98837",
  storageBucket: "messaging-app-98837.appspot.com",
  messagingSenderId: "194519848762",
  appId: "1:194519848762:web:85971f3ae04d821f1e6203",
  measurementId: "G-P2ZES8CKF5",
});
const auth = getAuth(app);
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="app">
      <header>
        <h1>⚛️🔥💬</h1>
        <Signout />
      </header>
      <section>{user ? <Chatroom /> : <Signin />}</section>
    </div>
  );
}

export default App;
