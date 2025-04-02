'use client';

import Image from 'next/image';
import { useState } from 'react';

interface NavItem {
  id: number;
  title: string;
  icon: string;
  activeIcon: string;
}

function Navigation() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [isLoggedIn] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 0,
      title: 'Home',
      icon: '/assets/category.png',
      activeIcon: '/assets/category-dark.png',
    },
    {
      id: 1,
      title: '일정 관리',
      icon: '/assets/book.png',
      activeIcon: '/assets/book-dark.png',
    },
  ];

  const handleNavClick = (index: number) => {
    setActiveNavIndex(index);
  };

  return (
    <div className='bg-primary-0 relative w-[252px] shrink-0 px-[32px]'>
      <div className='text-primary-900 mt-[44px] text-center text-[24px] font-bold'>
        똘개비
      </div>
      <ul className='text-secondary-300 mt-[52px] flex flex-col gap-y-[24px]'>
        {navItems.map(navItem => (
          <li
            key={navItem.id}
            className={`flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px] ${activeNavIndex === navItem.id ? 'text-secondary-500 rounded-[10px] bg-[#F5F5F7]' : 'hover:bg-[#F5F5F7]'}`}
            onClick={() => handleNavClick(navItem.id)}
          >
            <Image
              src={`${activeNavIndex === navItem.id ? navItem.activeIcon : navItem.icon}`}
              width={24}
              height={24}
              alt='category icon'
            />
            <span className='ml-[12px] text-[14px] font-semibold'>
              {navItem.title}
            </span>
          </li>
        ))}
      </ul>

      <div className='text-secondary-300 hover:text-secondary-500 absolute bottom-[24px] flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px]'>
        <Image
          src={isLoggedIn ? '/assets/logout.png' : '/assets/login.png'}
          width={24}
          height={24}
          alt='logout icon'
        />

        {isLoggedIn ? (
          <span className='ml-[12px] text-[14px] font-semibold'>로그아웃</span>
        ) : (
          <span className='ml-[12px] text-[14px] font-semibold'>로그인</span>
        )}
      </div>
    </div>
  );
}

export default Navigation;
