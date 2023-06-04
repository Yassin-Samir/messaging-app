import { lazy, Suspense, createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SignIn from "./components/signIn";
import "./css/App.css";
import "./css/signIn.css";
import "./css/chatroom.css";

const SignOut = lazy(() => import("./components/signOut"));
const Chatroom = lazy(() => import("./components/chatroom/chatroom"));
export const AuthContext = createContext(null);
export const FirebaseApp = initializeApp({
  apiKey: "AIzaSyBv3Clx3Z8YCBxtqe89efAbsBlhtAjeavg",
  authDomain: "messaging-app-98837.firebaseapp.com",
  projectId: "messaging-app-98837",
  storageBucket: "messaging-app-98837.appspot.com",
  messagingSenderId: "194519848762",
  appId: "1:194519848762:web:85971f3ae04d821f1e6203",
  measurementId: "G-P2ZES8CKF5",
});
const auth = getAuth(FirebaseApp);
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => setUser(user));
  }, []);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{user ? "Chatroom" : "Login page"}</title>
        </Helmet>
      </HelmetProvider>
      <AuthContext.Provider value={auth}>
        <div className="app">
          <header>
            <h1>⚛️🔥💬</h1>
            {user && <SignOut />}
          </header>
          <main>
            {user ? (
              <Suspense fallback={<div className="spinner big"></div>}>
                <Chatroom />
              </Suspense>
            ) : (
              <SignIn />
            )}
          </main>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default App;
