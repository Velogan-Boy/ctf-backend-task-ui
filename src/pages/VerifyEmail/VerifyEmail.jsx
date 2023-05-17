import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Chip, Divider, Paper, Input, Button, Box } from '@mui/material';

import InputBox from '../../components/InputBox/InputBox';

import styles from './VerifyEmail.module.css';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

function VerifyEmail() {
   const [formData, setFormData] = useState({
      email: '',
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const clickedSendOTP = () => {
      toast.success('OTP sent successfully');

      sessionStorage.setItem('email', formData.email);
      sessionStorage.setItem('isResetPassword', true);

      navigate('/verify-otp');
   };

   return (
      <Paper elevation={3} className={styles.card}>
         <div className={styles.formTitleBox}>
            <div className={styles.formTitle}>Verify Email</div>
            <div className={styles.formSubTitle}>Please verify your email to reset password</div>
         </div>

         <div className={styles.form}>
            <InputBox label="Enter your Registered Email" isRequired={true} name="email" inputType="text" handleChange={handleChange} />

            <div className={styles.submitButtonBox}>
               <Button onClick={clickedSendOTP} className={styles.loginButton} variant="contained" color="primary">
                  Send OTP
               </Button>
            </div>
         </div>
      </Paper>
   );
}

export default VerifyEmail;
