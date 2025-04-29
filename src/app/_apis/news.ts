import { NewsCategoryType } from '../_types/news';
import { api } from './tasks';

export const getNews = async (category: NewsCategoryType) => {
  const params = new URLSearchParams();
  params.set('category', category);

  return await api.get(`/external/news?${params}`);
};
