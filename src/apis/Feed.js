import API from './index'


export const getFeed = async ({page, pageSize}) => {
  try {
    const response = await API.get('/feed', {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('피드목록 조회 실패:', error.response.data); 
    throw error;
  }
};