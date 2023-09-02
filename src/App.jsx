import { lazy, Suspense, createContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { auth } from "./firebase/firebase";
import SignIn from "./components/signIn";
import "./css/App.css";
import "./css/signIn.css";
import "./css/chatroom.css";

const SignOut = lazy(() => import("./components/signOut"));
const Chatroom = lazy(() => import("./components/chatroom/chatroom"));
export const AuthContext = createContext(null);

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
