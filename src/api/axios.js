import axios from 'axios';

const url = 'https://ctf-techops-backend-task-api.onrender.com/api/v1';

const api = axios.create({
   baseURL: url,
});

export default api;
      