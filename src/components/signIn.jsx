import { useContext, useCallback } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "./Layout";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const { auth } = useContext(AuthContext);
  const HandleLogin = (provider) => {
    return async () => {
      try {
        const signIn = await signInWithPopup(auth, provider);
      } catch (error) {
        console.log({ signInError: error });
        alert("failed to sign-in retry again");
      }
    };
  };
  return (
    <button
      className="sign-in sign signBtn"
      id="google"
      onClick={HandleLogin(new GoogleAuthProvider())}
    >
      SignIn with google
    </button>
  );
}
export default SignIn;
