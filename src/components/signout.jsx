import { getAuth, signOut } from "firebase/auth";
function Signout() {
  const auth = getAuth();
  return (
    auth.currentUser && (
      <button
        onClick={async () => {
          try {
            signOut(auth);
          } catch (error) {
            alert("no internet");
          }
        }}
      >
        SignOut
      </button>
    )
  );
}
export default Signout;
