import { NewsArticle } from '@/app/_types/news';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleProps {
  article: NewsArticle;
}

function Article({ article }: ArticleProps) {
  return (
    <div className='border-primary-200 flex items-center gap-[20px] border-b pb-[10px]'>
      {article.image_url ? (
        <div className='relative h-[120px] w-[160px]'>
          <Image
            src={article.image_url}
            alt='뉴스 썸네일 이미지'
            fill
            className='rounded-[10px] object-cover'
          />
        </div>
      ) : (
        <div className='border-primary-200 inline-block rounded-[10px] border px-[60px] py-[40px]'>
          <Image
            src='/assets/gallery.png'
            alt='기본 썸네일 이미지'
            width={40}
            height={40}
          />
        </div>
      )}
      <div className='flex flex-1 flex-col gap-[4px]'>
        <div className='flex justify-between'>
          <Link
            href={article.link}
            className='text-[20px] font-semibold hover:underline'
          >{`[${article.source_name}] ${article.title}`}</Link>
          <div className='flex gap-[15px]'>
            <p className='text-secondary-300 text-[15px]'>
              {article.creator.join(' ')}
            </p>
            <p className='text-secondary-300 text-[15px]'>{article.pubDate}</p>
          </div>
        </div>
        <p className='text-overflow-3-line min-h-[72px] max-w-[700px]'>
          {article.description}
        </p>
      </div>
    </div>
  );
}

export default Article;
