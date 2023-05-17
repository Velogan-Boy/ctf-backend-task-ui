import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Divider, Paper, Input, Button, Box } from '@mui/material';

import InputBox from '../../components/InputBox/InputBox';

import { AuthContext } from '../../context/AuthContext';

import styles from './ResetPwd.module.css';

function ResetPwd() {
   const [formData, setFormData] = useState({
      password: '',
      confirmPassword: '',
   });

   const { handleResetPassword } = useContext(AuthContext);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const clickedUpdatePassword = () => {

      handleResetPassword({
         email: sessionStorage.getItem('email'),
         password: formData.password,
         confirmPassword: formData.confirmPassword,
         otp: +sessionStorage.getItem('otp'),
      });

   };

   return (
      <Paper elevation={3} className={styles.card}>
         <div className={styles.formTitleBox}>
            <div className={styles.formTitle}>Reset Password</div>
            <div className={styles.formSubTitle}>Create your new secure password</div>
         </div>

         <div className={styles.form}>
            <InputBox label="New Password" isRequired={true} name="password" inputType="password" isShowPasswordRequired={true} handleChange={handleChange} />

            <InputBox label="Confirm Password" isRequired={true} name="confirmPassword" inputType="password" handleChange={handleChange} />

           

            <div className={styles.submitButtonBox}>
               <Button onClick={clickedUpdatePassword} className={styles.loginButton} id="submit-button" variant="contained" color="primary">
                  Update my password
               </Button>
            </div>
         </div>
      </Paper>
   );
}

export default ResetPwd;
