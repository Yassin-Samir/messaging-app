import { getStorage } from "firebase/storage";
import { FirebaseApp } from "../App";
const storage = getStorage(FirebaseApp);
export default storage;
