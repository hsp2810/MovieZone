"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { actionLogin } from "@/redux/actions/authActions";

export default function Login() {
  const [email, setEmail] = useState("harshit123@gmail.com");
  const [password, setPassword] = useState("password");

  const login = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      await actionLogin(email, password);
    },
    [email, password]
  );

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-black p-5 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-5xl font-bold mb-10 text-center'>Login</h2>
        <form>
          <div className='mb-5'>
            <label htmlFor='email' className='block text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded-md border-gray-400 text-black focus:outline-none'
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-5'>
            <label htmlFor='password' className='block text-white'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded-md border-gray-400 text-black focus:outline-none'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='font-semibold block m-auto bg-white text-black hover:bg-gray-200 py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-100'
            onClick={login}
          >
            Login
          </button>
        </form>
        <p className='mt-4 text-white text-center'>
          Do not have an account?
          <Link href='/register' className='text-blue-300 hover:underline ml-1'>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
