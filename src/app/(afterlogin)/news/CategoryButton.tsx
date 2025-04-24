interface CategoryButtonProps {
  children: string;
  onClick?: () => void;
}

function CategoryButton({ children, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className='text-secondary-500 border-primary-200 rounded-[10px] border px-[28px] py-[8px] text-[20px] font-semibold text-nowrap'
    >
      {children}
    </button>
  );
}

export default CategoryButton;
