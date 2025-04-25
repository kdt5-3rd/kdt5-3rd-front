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
          <div className='flex gap-[15px]'>
            <p className='text-secondary-300 hidden text-[15px] sm:block'>
              {article.creator.join(' ')}
            </p>
            <p className='text-secondary-300 hidden text-[15px] sm:block'>
              {article.pubDate}
            </p>
          </div>
        </div>
        <p className='text-overflow-2-line sm:text-overflow-3-line max-w-[700px] text-[10px] sm:min-h-[72px] sm:text-[16px]'>
          {/* {article.description} */}
          뉴스 내용의 첫 문장부터 들어갑니다. 길이가 길어지면 말줄임표를
          사용하여 줄어듭니다. Lorem ipsum dolor sit amet...
        </p>
      </div>
    </div>
  );
}

export default Article;
