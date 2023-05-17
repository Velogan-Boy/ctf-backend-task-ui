import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

import { AuthContext } from '../../context/AuthContext';

import styles from './Home.module.css';

const Home = () => {
   const { handleLogout, isAuthenticated } = useContext(AuthContext);

   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate('/login');
      }
   }, [isAuthenticated]);

   return (
      <div className={styles.pageContainer}>
         <h1 className={styles.title}>Eureka !</h1>
         <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
         </button>

         <Confetti width={window.innerWidth} height={window.innerHeight} />
      </div>
   );
};

export default Home;
