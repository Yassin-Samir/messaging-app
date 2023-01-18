import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Fragment, useContext, useCallback } from "react";
import { AuthContext } from "../App";
import "../css/signin.css";
function SignIn() {
  const auth = useContext(AuthContext);
  const HandleLogin = useCallback((provider) => {
    return () => {
      try {
        signInWithPopup(auth, provider);
      } catch {
        alert("failed to sign-in retry again");
      }
    };
  }, []);
  return (
    <Fragment>
      <button
        className="sign-in"
        id="google"
        onClick={HandleLogin(new GoogleAuthProvider())}
      >
        SignIn with google
      </button>
    </Fragment>
  );
}
export default SignIn;
