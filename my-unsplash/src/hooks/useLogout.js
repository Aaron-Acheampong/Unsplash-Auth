import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setCurrentUser } = useAuth();

    const logout = async () => {
        setCurrentUser({});
        try {
            const response = await axios('/api/auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout