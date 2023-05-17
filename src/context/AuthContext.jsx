import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

import { registerUser, authenticateUser, verifyOTP, regenerateOTP, resetPassword, logoutUser, getUser } from '../api/userApi';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
   const [loader, setLoader] = useState(false);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const navigate = useNavigate();

   const handleRegister = async ({ email, password, confirmPassword, recaptchaToken }) => {
      setLoader(true);

      if (!email || !password || !confirmPassword) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         setLoader(false);
         return;
      }

      if (password.length < 8) {
         toast.error('Password must be atleast 8 characters long');
         setLoader(false);
         return;
      }

      if (!recaptchaToken) {
         toast.error('Please verify that you are not a robot');
         setLoader(false);
         return;
      }

      let { result, msg, user_id, isEmailVerified } = await registerUser({ email, password, recaptchaToken });

      if (result) {
         toast.success(msg);

         sessionStorage.setItem('email', email);
         sessionStorage.setItem('userid', user_id);
         sessionStorage.setItem('isEmailVerified', isEmailVerified);

         navigate('/verify-otp');
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleLogin = async ({ email, password, recaptchaToken }) => {
      setLoader(true);

      if (!email || !password) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      if (!recaptchaToken) {
         toast.error('Please verify that you are not a robot');
         setLoader(false);
         return;
      }

      let { result, msg, user_id, isEmailVerified } = await authenticateUser({ email, password, recaptchaToken });

      if (result) {
         toast.success(msg);

         sessionStorage.setItem('email', email);
         sessionStorage.setItem('userid', user_id);
         sessionStorage.setItem('isEmailVerified', isEmailVerified);

         navigate('/verify-otp');
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleVerifyOTP = async ({ otp, email, userid }) => {
      setLoader(true);

      if (!otp || otp.length !== 6) {
         toast.error('Please enter a valid OTP');
         setLoader(false);
         return;
      }

      if (!email || !userid) {
         toast.error('Something went wrong');
         setLoader(false);
         return;
      }

      let { result, msg } = await verifyOTP({ userid: +userid, otp, email });

      if (result) {
         toast.success(msg);
         setIsAuthenticated(true);
         navigate('/');
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleRegenerateOTP = async ({ email, userid }) => {
      setLoader(true);

      let { result, msg } = await regenerateOTP({ email, userid });

      if (result) {
         toast.success(msg);
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleResetPassword = async ({ email, password, confirmPassword , otp}) => {
      setLoader(true);

      if (!email || !password || !confirmPassword) {
         toast.error('Please fill all the fields');
         setLoader(false);
         return;
      }

      if (password !== confirmPassword) {
         toast.error('Passwords do not match');
         setLoader(false);
         return;
      }

      if (password.length < 8) {
         toast.error('Password must be atleast 8 characters long');
         setLoader(false);
         return;
      }
      
      

      let { result, msg } = await resetPassword({ email, password, otp });

      if (result) {
         toast.success(msg);
         sessionStorage.clear();
         navigate('/login');
      } else {
         toast.error(msg);
      }

      setLoader(false);
   };

   const handleLogout = async () => {
      setLoader(true);
      let { result, msg } = await logoutUser();

      if (result) {
         toast.success(msg);
         Cookies.remove('token');
         sessionStorage.clear();
         setIsAuthenticated(false);
      } else {
         toast.error(msg);
      }
      setLoader(false);
   };

   useEffect(() => {
      const token = Cookies.get('token');

      if (token) {
         getUser().then((res) => {
            if (res.result) {
               setIsAuthenticated(true);
               console.log('User is authenticated');
            }
         });
      }
   }, []);

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            handleRegister,
            handleLogin,
            handleVerifyOTP,
            handleRegenerateOTP,
            handleResetPassword,
            handleLogout,
            loader,
            setLoader,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
