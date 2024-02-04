import { DEFAULT_ERROR } from "@/constants/error";
import axios from "axios";

const URL = `/api/auth`;

export const actionLogin = async (email: string, password: string) => {
  try {
    console.log("Logging from CLient");
    const { data } = await axios.post(`${URL}/login`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return error.response?.data;
    } else {
      return DEFAULT_ERROR;
    }
  }
};

export const actionRegister = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const { data } = await axios.post(`${URL}/register`, {
      email,
      name,
      password,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    } else {
      return DEFAULT_ERROR;
    }
  }
};
