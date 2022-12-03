import "./css/App.css";
import { lazy, Suspense, createContext, Fragment } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
const Signin = lazy(() => import("./components/signin"));
const Signout = lazy(() => import("./components/signout"));
const Chatroom = lazy(() => import("./components/chatroom/chatroom"));
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
export const Context = createContext(null);
function App() {
  const [user] = useAuthState(auth);
  return (
    <Fragment>
      <Helmet>
        <title>{user ? "Chatroom" : "Login page"}</title>
      </Helmet>
      <Context.Provider value={auth}>
        <div className="app">
          <header>
            <h1>⚛️🔥💬</h1>
            {user && <Signout />}
          </header>
          <section>
            {user ? (
              <Suspense fallback={<div className="spinner big"></div>}>
                <Chatroom />
              </Suspense>
            ) : (
              <Signin />
            )}
          </section>
        </div>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
