import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  getAuth,
} from "firebase/auth";
import { Fragment } from "react";
const auth = getAuth();
function SignOut() {
  const HandleLogin = (provider) => {
    try {
      signInWithPopup(auth, provider);
    } catch (err) {
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
