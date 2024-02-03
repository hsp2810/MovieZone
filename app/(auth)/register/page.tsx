"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { actionRegister } from "@/redux/actions/authActions";

export default function Register() {
  const [name, setName] = useState("Harshit");
  const [email, setEmail] = useState("harshit123@gmail.com");
  const [password, setPassword] = useState("password");

  const register = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      const data = await actionRegister(email, name, password);
    },
    [name, email, password]
  );

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-[#000] p-8 rounded-lg shadow-lg w-1/3'>
        <h2 className='text-5xl font-bold mb-10 text-center'>
          Create an account
        </h2>
        <form>
          <div className='mb-5'>
            <label htmlFor='name' className='block text-white'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded-md border-gray-400 text-black focus:outline-none'
              placeholder='Enter your name'
              required
            />
          </div>
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
          <div className='mb-7'>
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
            className='block bg-white font-semibold text-black m-auto hover:bg-slate-300 py-2 px-4 rounded-md hover:bg-opacity-80 transition duration-100'
            onClick={register}
          >
            Register
          </button>
        </form>
        <p className='mt-4 text-white text-center'>
          Already a user?{" "}
          <Link href='/login' className='text-blue-300 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
