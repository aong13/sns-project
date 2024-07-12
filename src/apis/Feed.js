import API from './index'


export const getFeed = async (page, pageSize) => {
  try {
    const res = await API.get('/feed', {
      params: {
        page,
        pageSize,
      },
    });
    return res.data;
  } catch (error) {
    console.error('피드목록 조회 실패:', error.res); 
    throw error;
  }
};
export const getSearchTag = async (searchTag, page, pageSize) => {
  try {
      const res = await API.get('/feed/search', {
          params: {
              searchTag,
              page,
              pageSize,
          },
      });
      return res.data;
  } catch (error) {
      console.error('태그 검색 실패:', error.response);
      throw error;
  }
};
