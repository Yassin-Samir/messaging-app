import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Fragment, useContext } from "react";
import { AuthContext } from "../App";
import "../css/signin.css";
function SignOut() {
  const auth = useContext(AuthContext);
  const HandleLogin = (provider) => {
    try {
      signInWithPopup(auth, provider);
    } catch {
      alert("failed to sign-in retry again");
    }
  };
  return (
    <Fragment>
      <button
        className="sign-in"
        id="google"
        onClick={() => {
          HandleLogin(new GoogleAuthProvider());
        }}
      >
        SignIn with google
      </button>
    </Fragment>
  );
}
export default SignOut;
