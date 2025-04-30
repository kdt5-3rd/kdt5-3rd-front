import { Dispatch, SetStateAction } from 'react';
import CategoryButton from '../../news/CategoryButton';
import { categories } from '../../news/NewsCategory';
import { NewsCategoryType } from '@/app/_types/news';

interface NewsSettingProps {
  selectedCategory: NewsCategoryType[];
  setSelectedCategory: Dispatch<SetStateAction<NewsCategoryType[]>>;
}

function NewsSetting({
  selectedCategory,
  setSelectedCategory,
}: NewsSettingProps) {
  const handleToggle = (category: NewsCategoryType) => {
    if (selectedCategory.includes(category)) {
      return setSelectedCategory(prev =>
        prev.filter(selected => selected !== category),
      );
    }
    return setSelectedCategory(prev => [...prev, category]);
  };

  return (
    <div className='flex flex-wrap gap-[10px] *:text-[12px]!'>
      {categories.map(({ id, name, category }) => {
        if (category === 'top') return;

        return (
          <CategoryButton
            key={id}
            onClick={() => handleToggle(category)}
            isActive={selectedCategory.includes(category)}
          >
            {name}
          </CategoryButton>
        );
      })}
    </div>
  );
}

export default NewsSetting;
