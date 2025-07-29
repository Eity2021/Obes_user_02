import { useSelector } from "react-redux";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken || auth?.role) {
    return true;
  } else {
    return false;
  }
}
