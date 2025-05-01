'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import Navigation from '@/app/_components/nav/Navigation';
import NewsCategory from './NewsCategory';
import { Suspense, useState } from 'react';

import { NewsCategoryType } from '@/app/_types/news';
import Articles from './Articles';

export default function News() {
  const [category, setCategory] = useState<NewsCategoryType>('top');

  const handleCategory = (category: NewsCategoryType) => {
    setCategory(category);
  };

  return (
    <div className='text-secondary-500 flex h-dvh min-h-screen flex-col sm:min-w-[1440px] sm:flex-row'>
      <Navigation />
      <div className='flex h-full w-dvw min-w-[375px] flex-col sm:min-w-[752px]'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='뉴스' />
        </div>
        <div className='flex w-full flex-1 flex-col gap-[20px] bg-[#F5F5F7] px-[32px] py-[20px]'>
          <section className='scrollbar-hidden flex gap-[10px] overflow-x-scroll sm:justify-between'>
            <Suspense fallback={<div>loading...</div>}>
              <NewsCategory
                selectedCategory={category}
                onSelectedCategory={handleCategory}
              />
            </Suspense>
          </section>
          <section className='bg-primary-0 border-secondary-200 flex h-full flex-col gap-[10px] rounded-[10px] border p-[32px] *:last:border-b-0'>
            <Articles category={category} />
          </section>
        </div>
      </div>
    </div>
  );
}
