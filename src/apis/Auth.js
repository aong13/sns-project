import API from './index'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (loginData) => {
  try {
    const response = await API.post('/auth', loginData);
    console.log('로그인 성공:', response.data);

    const setCookieHeader = response.headers['set-cookie'];
    // 'ACCESS=토큰값;'에서 token만 추출
    const token = setCookieHeader[0].split(';')[0].split('=')[1];

    await AsyncStorage.setItem('authToken', token)
    console.log('토큰:', token);
    return response.data; 
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};