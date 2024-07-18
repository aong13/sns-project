import API from './index'


export const getFollowingList = async () => {
  try {
      const res = await API.get('/following');
      return res.data.result;
  } catch (error) {
      console.error('팔로잉 리스트:', error.res); 
      throw error;
  }
};

export const getFollowerList = async () => {
    try {
        const res = await API.get('/follower');
        return res.data.result;
    } catch (error) {
        console.error('팔로워 리스트 불러오기 실패:', error.res); 
        throw error;
    }
  };
  
export const postFollow = async (email) => {
    try {
        const res = await API.post('/following' , { email });
        return res.data.result;
    } catch (error) {
        console.error('팔로우 실패:', error.res); 
        throw error;
    }
  };
  