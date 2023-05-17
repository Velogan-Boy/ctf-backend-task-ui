import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';

import styles from './InputBox.module.css';

function InputBox({ label, isRequired, name, inputType, handleChange,  isShowPasswordRequired }) {
   const [hidePassword, setHidePassword] = useState(true);

   const toggleHidePassword = () => {
      setHidePassword(() => !hidePassword);
   };

   if (isShowPasswordRequired) {
      return (
         <div className={styles.formInput}>
            <label className={styles.formLabel}>
               {label} {isRequired && <span>*</span>}
            </label>
            <div className={styles.passField}>
               <input
                  autoComplete="off"
                  required={isRequired}
                  className={styles.inputField}
                  name={name}
                  type={hidePassword ? 'password' : 'text'}
                  onChange={handleChange}
               />
               <div className={styles.eyeIcon}>
                  <IconButton aria-label="toggle password visibility" onClick={toggleHidePassword}>
                     {hidePassword ? <VscEyeClosed /> : <VscEye />}
                  </IconButton>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className={styles.formInput}>
         <label className={styles.formLabel}>
            {label} {isRequired && <span>*</span>}
         </label>
         <input className={styles.inputField} name={name} type={inputType} autoComplete="off" onChange={handleChange}  />
      </div>
   );
}

export default InputBox;
