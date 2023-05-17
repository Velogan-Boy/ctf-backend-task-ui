import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Paper, Box } from '@mui/material';
import OTPInput from 'react-otp-input';

import { AuthContext } from '../../context/AuthContext';
import { regenerateOtp } from '../../api/userApi';

import styles from './OTP.module.css';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const OTP = () => {
   const { handleLogout, handleVerifyOTP, handleRegenerateOTP } = useContext(AuthContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (sessionStorage.getItem('email') === undefined) {
         navigate('/login');
      }
   }, []);

   const [otp, setOtp] = useState('');
   const Ref = useRef(null);
   const [timer, setTimer] = useState('05:00');

   const getTimeRemaining = (e) => {
      const total = Date.parse(e) - Date.parse(new Date());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      return {
         total,
         minutes,
         seconds,
      };
   };

   const startTimer = async (e) => {
      let { total, minutes, seconds } = getTimeRemaining(e);
      if (total >= 0) {
         setTimer((minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds));
      } else {
         if (Ref.current) clearInterval(Ref.current);
         await handleLogout();
      }
   };

   const clearTimer = (e) => {
      setTimer('05:00');
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
         startTimer(e);
      }, 1000);
      Ref.current = id;
   };

   const getDeadTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 300);
      return deadline;
   };

   const clickedRegenerateOtp = () => {
      handleRegenerateOTP({ email: sessionStorage.getItem('email') });

      clearTimer(getDeadTime());
   };

   useEffect(() => {
      clearTimer(getDeadTime());
   }, []);

   useEffect(() => {
      if (otp.length == 6) {
         const email = sessionStorage.getItem('email');
         const userid = sessionStorage.getItem('userid');
         const isResetPassword = sessionStorage.getItem('isResetPassword');

         console.log(email, userid, isResetPassword);

         if (isResetPassword) {
            toast.success('Enter new password');

            sessionStorage.setItem('otp', otp);

            navigate('/reset-password');
         } else {
            handleVerifyOTP({
               email: email,
               userid: userid,
               otp: otp,
            });
         }
      }
   }, [otp]);

   useEffect(() => {
      clickedRegenerateOtp();
   }, []);

   // const handleRegenerateOtp = async () => {
   //    setLoader(true);
   //    let { result, msg } = await regenerateOtp({ email: location.state.email });
   //    if (result) {
   //       await swal('Success Message', msg ? msg : 'Otp resent', 'success');
   //    } else {
   //       await swal('Failure Message', msg ? msg : 'Something went wrong :(', 'error');
   //    }
   //    setLoader(false);
   //    setTimer('05:00');
   // };

   return (
      <Paper elevation={3} className={styles.card}>
         <div className={styles.formTitleBox}>
            <div className={styles.formTitle}>Please Check your E-mail !</div>
            <div className={styles.formSubTitle}>Enter the OTP below to continue</div>
         </div>

         <div className={styles.otpForm}>
            <OTPInput
               value={otp}
               onChange={setOtp}
               shouldAutoFocus={true}
               numInputs={6}
               renderSeparator={<span>-</span>}
               renderInput={(props) => <input {...props} />}
               containerStyle={styles.otp}
               inputStyle={styles.inputStyle}
            />
            <div className={styles.timerContainer} color="#212121" variant="subtitle2">
               OTP Expries in <span className={styles.timer}>{timer}</span>
            </div>

            <div className={styles.reOtpContainer}>
               Click here to <span onClick={clickedRegenerateOtp}>regenerate</span>
               the OTP
            </div>
         </div>
      </Paper>
   );
};

export default OTP;
