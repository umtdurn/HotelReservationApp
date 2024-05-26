import axios from "axios";
import { BASE_URL } from "../constant/base_url";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const logout = () => {
  document.cookie = 'user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const checkAuth = async () => {
  const token = getCookie("user_token")

  if (token) {
    try {
      const response = await axios.post(BASE_URL+'/CheckToken', { token });
      if (response.status === 200) {
        return true;
      } else {
        // logout();
        return false;
      }
    } catch (error) {
      // logout();
      return false;
    }
  } else {
    // logout();
    return false;
  }
};