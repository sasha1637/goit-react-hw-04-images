import axios from 'axios';
export const searchImage = async (searchQuery, page = 1) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      image_type: 'photo',
      key: '27500095-0ff642ee8d6c39f05f430f005',
      q: `${searchQuery}`,
      per_page: 12,
      safesearch: 'true',
      orientation: 'horizontal',
      page: `${page}`,
    },
  });
  return response.data;
};
