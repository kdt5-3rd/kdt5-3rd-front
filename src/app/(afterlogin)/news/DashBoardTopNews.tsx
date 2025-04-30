import useGetNewsQuery from '@/app/_hooks/useGetNewsQuery';
import { NewsArticle } from '@/app/_types/news';
import Image from 'next/image';
import spinner from '@/assets/lottie/spinner.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface TopNewsArticleProps {
  article: NewsArticle;
}

function TopNewsArticle({ article }: TopNewsArticleProps) {
  return (
    <div className='flex gap-[10px]'>
      <div className='relative h-[50px] w-[50px] flex-shrink-0'>
        <Image
          src={article.image_url}
          alt='뉴스 썸네일 이미지'
          fill
          className='rounded-[10px] object-cover'
        />
      </div>
      <Link
        href={article.link}
        className='text-overflow-2-line hover:underline'
      >
        {article.title}
      </Link>
    </div>
  );
}

function DashBoardTopNews() {
  const { data: newsData, isLoading, isError } = useGetNewsQuery('top');

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Lottie animationData={spinner} style={{ width: 150, height: 150 }} />
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
    <div className='border-primary-200 bg-primary-0 flex flex-col gap-[18px] rounded-2xl border px-[30px] py-[26px]'>
      <p className='text-secondary-500 text-[20px] font-semibold'>Top News</p>
      <div className='flex flex-col gap-[15px]'>
        {newsData.articles.map(article => (
          <TopNewsArticle key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default DashBoardTopNews;
