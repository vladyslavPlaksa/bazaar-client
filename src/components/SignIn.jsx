import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { BsFacebook, BsGoogle } from "react-icons/bs";

import { auth, signInWithFacebook, signInWithGoogle } from "../api/firebase";
import * as ROUTES from "../constants/routes";

const SignIn = ({ navigate }) => {
  const doSignInUser = (form) => {
    form.preventDefault();

    const email = form.target.login.value;
    const password = form.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        // console.log(cred);
        form.target.reset();
        navigate(ROUTES.HOMEPAGE);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className='flex justify-center items-center flex-col h-[75vh] w-full'>
      <div className='bg-gray-300 p-10 rounded max-w-[400px] mx-[5%]'>
        <form onSubmit={doSignInUser} className='flex justify-center items-center flex-col w-full'>
          <span>
            <input
              type='email'
              name='login'
              id='login'
              placeholder='Login'
              autoComplete='email'
              className='border-solid border-black border-2 rounded px-5 py-2 mb-2 w-full'
            />
          </span>
          <span>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Hasło'
              autoComplete='current-password'
              className='border-solid border-black border-2 rounded px-5 py-2 w-full'
            />
          </span>
          <input
            type='submit'
            value='Submit'
            className='bg-gray-50 hover:bg-gray-400 rounded px-5 py-2 mt-3 cursor-pointer w-[85%]'
          />
        </form>
        <div className='flex justify-center items-center flex-col'>
          <Link to={ROUTES.SIGN_UP} className='font-bold mt-3 mb-5 text-left'>
            Nie masz Konta?
          </Link>
          <button
            onClick={signInWithGoogle}
            className='bg-gray-50 hover:bg-gray-400 px-5 py-2 rounded mb-5 w-full'>
            <div className='flex justify-center items-center'>
              <BsGoogle />
              <i className='ml-2'>Sign in with Google</i>
            </div>
          </button>
          <button
            onClick={signInWithFacebook}
            className='bg-gray-50 hover:bg-gray-400 px-5 py-2 rounded w-full'>
            <div className='flex justify-center items-center'>
              <BsFacebook />
              <i className='ml-2'>Sign in with Facebook</i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
