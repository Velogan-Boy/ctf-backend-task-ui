import api from './axios';

import Cookies from 'js-cookie';

const route = 'user';

export const getUser = async () => {
   try {
      let {
         data: { message, user },
      } = await api.get(`${route}`, {
         headers: {
            tokenstring: Cookies.get('token'),
         },
      });

      return { result: true, msg: message, user };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const registerUser = async ({ email, password, recaptchaToken }) => {
   try {
      let {
         data: { message, user_id, isEmailVerified },
      } = await api.post(`${route}/register`, {
         email: email,
         password: password,
         recaptchaToken: recaptchaToken,
      });

      return { result: true, msg: message, user_id, isEmailVerified };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const authenticateUser = async ({ email, password, recaptchaToken }) => {
   try {
      let {
         data: { message, user_id, isEmailVerified },
      } = await api.post(`${route}/authenticate`, {
         email: email,
         password: password,
         recaptchaToken: recaptchaToken,
      });

      return { result: true, msg: message, user_id, isEmailVerified };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const verifyOTP = async ({ userid, otp, email }) => {
   try {
      let {
         data: { message, token },
      } = await api.post(`${route}/verify`, {
         userid: userid,
         otp: otp,
         email: email,
      });

      Cookies.set('token', token, { expires: 10 });

      return { result: true, msg: message };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const regenerateOTP = async ({ userid, email }) => {
   try {
      let {
         data: { message, user_id },
      } = await api.post(`${route}/regenerateOTP`, {
         userid: userid,
         email: email,
      });
      return { result: true, msg: message, user_id };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const resetPassword = async ({ userid, email, password, otp }) => {
   try {
      let {
         data: { message },
      } = await api.post(`${route}/resetPassword`, {
         userid: userid,
         email: email,
         password: password,
         otp: otp,
      });
      return { result: true, msg: message };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};

export const logoutUser = async () => {
   try {
      let {
         data: { message },
      } = await api.get(`${route}/logout`, {
         headers: {
            tokenstring: Cookies.get('token'),
         },
      });
      return { result: true, msg: message };
   } catch (err) {
      console.log(err);
      return { result: false, msg: err.response.data.message };
   }
};
