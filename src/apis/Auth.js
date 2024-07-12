import API from './index'; 

export const login = async (loginData) => {
  try {
    const response = await API.post('/auth', loginData);
    console.log('로그인 성공:', response.data);
    return response.data; 
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};