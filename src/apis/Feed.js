import API from './index'


export const getFeed = async (page, pageSize) => {
  try {
      const res = await API.get('/feed', {
          params: {
            page,
            pageSize,
      },
      });
      return res.data.result;
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

export const createFeed = async (content, tags, images) => {
  const feedRequest = {
    content: content,
    tags: tags,
  };
  const formData = new FormData();
  formData.append('feedRequest', JSON.stringify(feedRequest));

  images.map((image, index) => {
     formData.append('image', {
          name: image.filename || `image_${index}.jpg`,
          uri: image.uri,
          type: image.type || 'image/jpeg',
    });
  });
  // console.log("formData:", formData);
  try {
      const res = await API.post('/feed', formData,{
          headers:{
              'Content-Type': 'multipart/form-data',
      }});
    return res.data;
  } catch (error) {
      console.error('피드 작성 실패:', error.response);
      throw error;
  }
};
