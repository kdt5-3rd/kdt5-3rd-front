import { useState } from 'react';
import CategoryButton from '../../news/CategoryButton';
import { categories } from '../../news/NewsCategory';

function NewsSetting() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleToggle = (category: string) => {
    if (selectedCategory.includes(category)) {
      return setSelectedCategory(prev =>
        prev.filter(selected => selected !== category),
      );
    }
    return setSelectedCategory(prev => [...prev, category]);
  };
  return (
    <div className='flex gap-[10px] *:text-[12px]!'>
      {categories.map(({ categoryId, categoryName, category }) => (
        <CategoryButton
          key={categoryId}
          onClick={() => handleToggle(category)}
          isActive={selectedCategory.includes(category)}
        >
          {categoryName}
        </CategoryButton>
      ))}
    </div>
  );
}

export default NewsSetting;
