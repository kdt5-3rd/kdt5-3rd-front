interface CategoryButtonProps {
  children: string;
  isActive: boolean;
  onClick?: () => void;
}

function CategoryButton({ children, isActive, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${isActive ? 'bg-primary-400 text-primary-0' : 'text-secondary-500'} border-primary-200 cursor-pointer rounded-[10px] border px-[18px] py-[8px] text-[16px] font-semibold text-nowrap sm:w-full sm:text-[16px]`}
    >
      {children}
    </button>
  );
}

export default CategoryButton;
