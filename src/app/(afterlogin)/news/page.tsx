'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import Article from './Article';
import NewsCategory from './NewsCategory';
import { Suspense, useState } from 'react';

const dummy = [
  {
    article_id: '1',
    title: 'AI 기술이 산업을 바꾼다',
    description: '인공지능 기술이 빠르게 발전하며...',
    source_name: '연합뉴스',
    creator: ['아무개 기자'],
    link: 'https://news.example.com/ai',
    image_url: '',
    pubDate: '2025-04-23 08:16:14',
  },
  {
    article_id: '2',
    title: 'AI 기술이 산업을 바꾼다',
    description: '인공지능 기술이 빠르게 발전하며...',
    source_name: '연합뉴스',
    creator: ['아무개 기자'],
    link: 'https://news.example.com/ai',
    image_url:
      'https://cdn.jejumaeil.net/news/photo/202504/346171_120232_146.jpg',
    pubDate: '2025-04-23 08:16:14',
  },
  {
    article_id: '3',
    title: 'AI 기술이 산업을 바꾼다',
    description: '인공지능 기술이 빠르게 발전하며...',
    source_name: '연합뉴스',
    creator: ['아무개 기자'],
    link: 'https://news.example.com/ai',
    image_url: '',
    pubDate: '2025-04-23 08:16:14',
  },
  {
    article_id: '4',
    title: 'AI 기술이 산업을 바꾼다',
    description: '인공지능 기술이 빠르게 발전하며...',
    source_name: '연합뉴스',
    creator: ['아무개 기자'],
    link: 'https://news.example.com/ai',
    image_url: '',
    pubDate: '2025-04-23 08:16:14',
  },
  {
    article_id: '5',
    title: 'AI 기술이 산업을 바꾼다',
    description: '인공지능 기술이 빠르게 발전하며...',
    source_name: '연합뉴스',
    creator: ['아무개 기자'],
    link: 'https://news.example.com/ai',
    image_url: '',
    pubDate: '2025-04-23 08:16:14',
  },
];

export default function News() {
  const [category, setCategory] = useState<string | null>(null);

  const handleCategory = (category: string | null) => {
    setCategory(category);
  };

  return (
    <div className='text-secondary-500 flex h-full min-h-screen flex-col sm:min-w-[1440px] sm:flex-row'>
      <Navigation />
      <div className='min-h-dvh w-dvw min-w-[400px] bg-[#F5F5F7] sm:min-w-[752px]'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='뉴스' />
        </div>
        <div className='flex w-full flex-col gap-[20px] px-[32px] py-[20px]'>
          <section className='scrollbar-hidden flex gap-[10px] overflow-x-scroll sm:justify-between'>
            <Suspense fallback={<div>loading...</div>}>
              <NewsCategory
                selectedCategory={category}
                onSelectedCategory={handleCategory}
              />
            </Suspense>
          </section>
          <section className='bg-primary-0 border-secondary-200 flex flex-col gap-[10px] rounded-[10px] border p-[32px] *:last:border-b-0'>
            {dummy.map(article => (
              <Article key={article.article_id} article={article} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
