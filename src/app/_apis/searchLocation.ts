import axios from 'axios';

export const searchLocation = async (query: string) => {
  try {
    const response = await axios.get('/api/search-location', {
      params: { query },
    });

    return response;
  } catch (error) {
    console.error('API 호출 중 에러가 발생했습니다.', error);
  }
};
