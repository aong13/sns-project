import API from './index'


export const getProfile = async () => {
  try {
      const res = await API.get('/accounts/info/mypage');
      return res.data.result;

  } catch (error) {
      console.error('내정보 조회 실패:', error.res); 
      throw error;
  }
};


export const getMyInfo = async () => {
  try {
      const res = await API.get('/accounts/info/info');
      return res.data.result;

  } catch (error) {
      console.error('내정보 조회 실패:', error.res); 
      throw error;
  }
};
