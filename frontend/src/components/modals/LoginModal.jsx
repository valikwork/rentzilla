import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { PROFILE_ROUTE } from '../../constants/routes';
import { setCredentials } from '../../slices/authSlice';
import { toggleModal } from '../../slices/modalsSlice';
import { useLoginMutation } from '../../slices/usersApiSlice';
import Modal from '../ui/Modal';

const schema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string()
    .required('No password provided.') 
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

export default function LoginModal() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const showModal = useSelector((state) => state.modals.login);

  const close = () => dispatch(toggleModal({login: false}))
  const toRegisterModal = () => dispatch(toggleModal({login: false, register: true}))

  const { 
    reset,
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (userInfo) {
      navigate(PROFILE_ROUTE);
    }
  }, [navigate, userInfo]);

  const onSubmit = async ({email, password}) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
      close()
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => reset(), [showModal, reset])

  if(showModal){
    return (
      <Modal close={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Email address"
              {...register("email")}
              />
              {errors.email && <p className=' mt-2'>{errors.email.message}</p>}
          </div>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
              type="password"
              {...register("password")}
              />
              {errors.password && <p className=' mt-2'>{errors.password.message}</p>}
          </div>
  
          <div className="text-center lg:text-left">
            
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              {isLoading ? 'Sending' : 'Submit'}
            </button>
  
            <p className="mb-0 mt-4 pt-1 text-center text-sm font-semibold ">
              <span>Don&apos;t have an account?</span>
              <br/>
              <button
                onClick={toRegisterModal}
                className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
              >Register</button>
            </p>
          </div>
        </form>
      </Modal>
    )
  } else return null;

}
