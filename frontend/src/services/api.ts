import axios from "axios";

const api = axios.create({
  baseURL: 'https://f29faec4-6487-4b60-882f-383b4054cc32.mock.pstmn.io/'
});

export default api