import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Backdrop } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import Loader from './components/Loader/Loader';

import { AuthContext } from './context/AuthContext';

// PAGES
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import OTP from './pages/OTP/OTP';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import ResetPwd from './pages/ResetPwd/ResetPwd';

import './App.css';
import './fonts.css';

function App() {
   const { loader } = useContext(AuthContext);

   return (
      <>
         <Toaster position="top-right" />
         <Box sx={{ maxWidth: '1500px', margin: '0 auto', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/verify-otp" element={<OTP />} />
               <Route path="/reset-password" element={<ResetPwd />} />
               <Route path="/verify-email" element={<VerifyEmail />} />
            </Routes>
         </Box>
         <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
            <Loader />
         </Backdrop>
      </>
   );
}

export default App;

