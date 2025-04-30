import useGetNewsQuery from '@/app/_hooks/useGetNewsQuery';
import Article from './Article';
import { NewsCategoryType } from '@/app/_types/news';
import spinner from '@/assets/lottie/spinner.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface ArticlesProps {
  category: NewsCategoryType;
}

function Articles({ category }: ArticlesProps) {
  const { data: newsData, isLoading, isError } = useGetNewsQuery(category);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Lottie animationData={spinner} style={{ width: 50, height: 50 }} />
      </div>
    );
  }

  if (
    isError ||
    !newsData ||
    !newsData.articles ||
    (newsData.articles && newsData.articles.length === 0)
  ) {
    return (
      <div className='flex h-full items-center justify-center'>
        뉴스를 불러오지 못했습니다. 잠시후 다시 시도해주세요
      </div>
    );
  }

  return (
    <>
      {newsData.articles.map(article => (
        <Article key={article.article_id} article={article} />
      ))}
    </>
  );
}

export default Articles;
