import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsCategoryType } from '../_types/news';

interface NewsCategoryState {
  newsCategories: NewsCategoryType[];
  setCategories: (newsCategories: NewsCategoryType[]) => void;
}

const initialCategories: NewsCategoryType[] = [
  'top',
  'sports',
  'technology',
  'business',
  'science',
  'entertainment',
  'health',
  'world',
  'politics',
  'environment',
  'food',
];

export const useNewsCategoryStore = create<NewsCategoryState>()(
  persist(
    set => ({
      newsCategories: initialCategories,
      setCategories: newsCategories => set({ newsCategories }),
    }),
    {
      name: 'newsCategory',
    },
  ),
);
