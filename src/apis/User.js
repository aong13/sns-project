import API from "./index";

export const signup = async (userData) => {
  try {
    const response = await API.post('accounts', userData);
    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};