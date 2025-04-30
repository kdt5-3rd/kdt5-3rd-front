'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryButton from './CategoryButton';
import { useEffect, useState } from 'react';
import { NewsCategoryType } from '@/app/_types/news';

type CategoriesType = {
  id: number;
  name: string;
  category: NewsCategoryType;
};

export const categories: CategoriesType[] = [
  {
    id: 1,
    name: 'Top',
    category: 'top',
  },
  {
    id: 2,
    name: '스포츠',
    category: 'sports',
  },
  {
    id: 3,
    name: '기술',
    category: 'technology',
  },
  {
    id: 4,
    name: '경제',
    category: 'business',
  },
  {
    id: 5,
    name: '과학',
    category: 'science',
  },
  {
    id: 6,
    name: '연예',
    category: 'entertainment',
  },
  {
    id: 7,
    name: '건강',
    category: 'health',
  },
  {
    id: 8,
    name: '세계',
    category: 'world',
  },
  {
    id: 9,
    name: '정치',
    category: 'politics',
  },
  {
    id: 10,
    name: '환경',
    category: 'environment',
  },
  {
    id: 11,
    name: '음식',
    category: 'food',
  },
];

interface NewsCategoryProps {
  selectedCategory: NewsCategoryType;
  onSelectedCategory: (category: NewsCategoryType) => void;
}

function NewsCategory({ onSelectedCategory }: NewsCategoryProps) {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryType>('top');

  const handleClick = (category: NewsCategoryType) => {
    const newParams = new URLSearchParams(searchParam?.toString());
    newParams.set('category', category);
    router.push(`?${newParams.toString()}`);

    setSelectedCategory(category);
  };

  useEffect(() => {
    if (searchParam) {
      const param = searchParam.get('category');

      if (!param) {
        const newParams = new URLSearchParams(searchParam?.toString());
        newParams.set('category', 'top');
        router.push(`?${newParams.toString()}`);

        return;
      }

      setSelectedCategory(param as NewsCategoryType);
    }
  }, [searchParam, router]);

  useEffect(() => {
    onSelectedCategory(selectedCategory);
  }, [selectedCategory, onSelectedCategory]);

  return (
    <>
      {categories.map(({ id, name, category }) => (
        <CategoryButton
          key={id}
          onClick={() => handleClick(category)}
          isActive={selectedCategory === category}
        >
          {name}
        </CategoryButton>
      ))}
    </>
  );
}

export default NewsCategory;
