import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

import InputBox from '../../components/InputBox/InputBox';

import { AuthContext } from '../../context/AuthContext';

import styles from './Login.module.css';

function Login() {
   const [isSignup, setIsSignup] = useState(false);
   const { handleRegister, handleLogin, isAuthenticated } = useContext(AuthContext);
   const navigate = useNavigate();
   const captchaRef = useRef(null);

   const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup);
   };

   const clickedRegister = () => {
      const token = captchaRef.current.getValue();

      handleRegister({
         email: formData.email,
         password: formData.password,
         confirmPassword: formData.confirmPassword,
         recaptchaToken: token,
      });

      captchaRef.current.reset();
   };

   const clickedLogin = () => {
      const token = captchaRef.current.getValue();

      handleLogin({
         email: formData.email,
         password: formData.password,
         recaptchaToken: token,
      });

      captchaRef.current.reset();
   };

   useEffect(() => {
      if (isAuthenticated) {
         navigate('/');
      }
   }, [isAuthenticated]);

   return (
      <Paper elevation={3} className={styles.card}>
         <div className={styles.formTitleBox}>
            <div className={styles.formTitle}>{isSignup ? <>Hello There !</> : <>Welcome Back !</>}</div>
            <div className={styles.formSubTitle}>
               {isSignup ? (
                  <>
                     <>Enter your details to get started</>
                  </>
               ) : (
                  <>Enter your credentials to login</>
               )}
            </div>
         </div>

         <div className={styles.form}>
            <InputBox label="Email" isRequired={true} name="email" inputType="text" handleChange={handleChange} />

            <InputBox label="Password" isRequired={true} name="password" inputType="password" handleChange={handleChange} isShowPasswordRequired={true} />

            {isSignup && <InputBox label="Confirm Password" isRequired={true} name="confirmPassword" inputType="password" handleChange={handleChange} />}

            {!isSignup && (
               <Link to="/verify-email">
                  <div className={styles.fgtpwdText}>Forgot Password?</div>
               </Link>
            )}

            <div className={styles.recaptchaBox}>
               <ReCAPTCHA sitekey="6Le3KRgmAAAAABbr_FAb9KMrIMYBALnBVGupxqJj" ref={captchaRef} />
            </div>

            <div className={styles.submitButtonBox}>
               <Button onClick={isSignup ? clickedRegister : clickedLogin} className={styles.loginButton} variant="contained" color="primary">
                  {isSignup ? 'Sign Up' : 'Login'}
               </Button>
            </div>

            <div className={styles.formEndTitle}>
               {!isSignup ? (
                  <>
                     Don't have an account? <span onClick={switchMode}>Sign Up here</span>
                  </>
               ) : (
                  <>
                     Already have an account? <span onClick={switchMode}>Login here</span>
                  </>
               )}
            </div>
         </div>
      </Paper>
   );
}

export default Login;
