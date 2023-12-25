import axios from "axios";

const URL = `/api/auth`;

export const actionLogin = async (email: string, password: string) => {
  try {
    const data = await axios.post(`${URL}/login`, {
      email,
      password,
    });
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
};

export const actionRegister = async (
  email: string,
  name: string,
  password: string
) => {
  try {
    const data = await axios.post(`${URL}/register`, {
      email,
      name,
      password,
    });
    console.log(data);
    // return data;
  } catch (error) {
    console.log(error);
  }
};
