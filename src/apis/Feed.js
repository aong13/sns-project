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

export const getFeedDetail = async (feedId) => {
  try {
      const res = await API.get(`/feed/${feedId}`);
      console.log('FeedDetail 조회 :', res.data.result); 
      return res.data.result;
  } catch (error) {
      console.error('FeedDetail 조회 실패:', error.res); 
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
      return res.data.result;
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

export const postReply = async (feedId, reply) => {
  try {
    const res = await API.post(`/feed/${feedId}/reply`, {reply});
    console.error('댓글 작성 성공:', res.data);
    return res.data;
  } catch (error) {
    console.error('댓글 작성 실패:', error.response);
    throw error;
  }
};

export const postEmotion = async (feedId, emotionType) => {
  try {
    const res = await API.post(`/feed/${feedId}/emotion?emotionType=${emotionType}`);
    return res.data;
  } catch (error) {
    console.error('emotion 추가 실패:', error.response);
    throw error;
  }
};
