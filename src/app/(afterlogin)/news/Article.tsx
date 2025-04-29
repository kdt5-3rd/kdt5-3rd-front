import { NewsArticle } from '@/app/_types/news';
import Image from 'next/image';
import Link from 'next/link';
import { toZonedTime } from 'date-fns-tz';
import { formatDate } from 'date-fns';

interface ArticleProps {
  article: NewsArticle;
}

function Article({ article }: ArticleProps) {
  const pubDateKST =
    article.pubDateTZ === 'UTC'
      ? toZonedTime(new Date(article.pubDate + 'Z'), 'Asia/Seoul')
      : article.pubDate;
  console.log(pubDateKST);
  return (
    <div className='border-primary-200 flex items-center gap-[20px] border-b pb-[10px]'>
      {article.image_url ? (
        <div className='relative h-[70px] w-[80px] sm:h-[120px] sm:w-[160px]'>
          <Image
            src={article.image_url}
            alt='뉴스 썸네일 이미지'
            fill
            className='rounded-[10px] object-cover'
          />
        </div>
      ) : (
        <div className='border-primary-200 inline-flex h-[70px] w-[80px] items-center justify-center rounded-[10px] border sm:h-[120px] sm:w-[160px]'>
          <div className='relative h-[20px] w-[20px] sm:h-[40px] sm:w-[40px]'>
            <Image src='/assets/gallery.png' alt='기본 썸네일 이미지' fill />
          </div>
        </div>
      )}
      <div className='flex flex-1 flex-col gap-[4px]'>
        <div className='flex justify-between'>
          <Link
            href={article.link}
            className='text-[14px] font-semibold hover:underline sm:text-[20px]'
          >{`[${article.source_name}] ${article.title}`}</Link>
          <div className='flex flex-col gap-[5px] text-right'>
            <p className='text-secondary-300 hidden text-[12px] sm:block'>
              {formatDate(pubDateKST, 'yyyy-MM-dd HH:mm:ss')}
            </p>
            <p className='text-secondary-300 hidden text-[12px] sm:block'>
              {article.creator?.join(' ')}
            </p>
          </div>
        </div>
        <p className='text-overflow-2-line sm:text-overflow-3-line max-w-[700px] text-[10px] sm:min-h-[72px] sm:text-[16px]'>
          {article.description}
        </p>
      </div>
    </div>
  );
}

export default Article;
