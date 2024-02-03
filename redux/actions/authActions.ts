import axios from "axios";

const URL = `/api/auth`;

export const actionLogin = async (email: string, password: string) => {
  try {
    const data = await axios.post(
      `${URL}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
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

    return data;
  } catch (error) {
    console.log(error);
  }
};
