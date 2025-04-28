'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryButton from './CategoryButton';
import { useEffect, useState } from 'react';

export const categories = [
  {
    categoryId: 1,
    categoryName: 'Top',
    category: 'top',
  },
  {
    categoryId: 2,
    categoryName: '스포츠',
    category: 'sports',
  },
  {
    categoryId: 3,
    categoryName: '기술',
    category: 'technology',
  },
  {
    categoryId: 4,
    categoryName: '경제',
    category: 'business',
  },
  {
    categoryId: 5,
    categoryName: '과학',
    category: 'science',
  },
  {
    categoryId: 6,
    categoryName: '연예',
    category: 'entertainment',
  },
  {
    categoryId: 7,
    categoryName: '건강',
    category: 'health',
  },
  {
    categoryId: 8,
    categoryName: '세계',
    category: 'world',
  },
  {
    categoryId: 9,
    categoryName: '정치',
    category: 'politics',
  },
  {
    categoryId: 10,
    categoryName: '환경',
    category: 'environment',
  },
  {
    categoryId: 11,
    categoryName: '음식',
    category: 'food',
  },
];

interface NewsCategoryProps {
  selectedCategory: string;
  onSelectedCategory: (category: string) => void;
}

function NewsCategory({ onSelectedCategory }: NewsCategoryProps) {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('top');

  const handleClick = (category: string) => {
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

      setSelectedCategory(param);
    }
  }, [searchParam, router]);

  useEffect(() => {
    onSelectedCategory(selectedCategory);
  }, [selectedCategory, onSelectedCategory]);

  return (
    <>
      {categories.map(({ categoryId, categoryName, category }) => (
        <CategoryButton
          key={categoryId}
          onClick={() => handleClick(category)}
          isActive={selectedCategory === category}
        >
          {categoryName}
        </CategoryButton>
      ))}
    </>
  );
}

export default NewsCategory;
