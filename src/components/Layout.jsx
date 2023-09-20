import { lazy, createContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { auth } from "../firebase/firebase";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
const SignOut = lazy(() => import("./signOut"));
export const AuthContext = createContext(null);

function Layout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    const unListen = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (Location.pathname === "/updateProfile" && user) return;
      navigate(user ? "/chatroom" : "/signin");
      console.log('jetta');
    });
  }, []);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{user ? "Chatroom" : "Login page"}</title>
        </Helmet>
      </HelmetProvider>
      <AuthContext.Provider value={{ auth, user }}>
        <div className="app">
          <header>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {user && (
                <Link to={"updateProfile"}>
                  <img
                    src={user.photoURL}
                    className="updateProfile"
                    referrerPolicy="no-referrer"
                  />
                </Link>
              )}
              <h1>⚛️🔥💬</h1>
            </div>
            {user && <SignOut />}
          </header>
          <>
            <main>
              <Outlet />
            </main>
          </>
        </div>
      </AuthContext.Provider>
    </>
  );
}

export default Layout;
