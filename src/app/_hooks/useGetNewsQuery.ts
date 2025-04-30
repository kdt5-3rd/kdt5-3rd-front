import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { NewsCategoryType, NewsResponse } from '../_types/news';
import { getNews } from '../_apis/news';

const useGetNewsQuery = (category: NewsCategoryType) => {
  return useQuery<AxiosResponse<NewsResponse>, AxiosError, NewsResponse>({
    queryKey: ['news', category],
    queryFn: () => getNews(category),
    enabled: !!category,
    select: data => data.data,
  });
};

export default useGetNewsQuery;
