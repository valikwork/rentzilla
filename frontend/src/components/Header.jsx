import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PROFILE_ROUTE } from '../constants/routes';
import { removeCredentials } from '../slices/authSlice';
import { toggleModal } from '../slices/modalsSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import AddAdvertButton from './ui/AddAdvertButton';
import Logo from "../assets/logo.svg?react";

export default function Header() {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const showAddModal = () => dispatch(toggleModal({advert: true}))
  const showLoginModal = () => dispatch(toggleModal({login: true}))
  const showRegisterModal = () => dispatch(toggleModal({register: true}))

  return (
    <header>
      <nav className="relative flex w-full items-center justify-between bg-rentzilaHeaderBackground py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="grow basis-[100%] items-center flex basis-auto" >
            <ul className="mr-auto flex flex-row w-full" >
            <li className="mb-0 pr-2 flex items-center">
              <Link to={'/'} className='flex items-center'>
                <Logo />
              </Link>
            </li>
              {userInfo ? (
                  <>
                    <li className="mb-0 pr-2">
                      <Link to={PROFILE_ROUTE} >
                        <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90">
                          Profile
                        </span>
                      </Link>
                    </li>
                    <li className="mb-0 pr-2">
                      <button onClick={logoutHandler} >
                        <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90">
                          Sign Out
                        </span>
                      </button>
                    </li>
                  </>
              ) : (
                <>
                  <li className="mb-0 pr-2">
                    <button 
                      className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      onClick={showLoginModal}
                    >
                      Sign In
                    </button>
                  </li>
                  <li className="mb-0 pr-2">
                    <button 
                      className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      onClick={showRegisterModal}
                      >Sign Up
                    </button>
                  </li>
                </>
              )}
              <li className="mb-0 pr-2 ml-auto">
                <AddAdvertButton onClick={userInfo ? showAddModal : showLoginModal} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
