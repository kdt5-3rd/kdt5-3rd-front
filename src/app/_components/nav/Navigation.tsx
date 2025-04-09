'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavItem {
  id: number;
  title: string;
  icon: string;
  activeIcon: string;
  href: string;
}

function Navigation() {
  const pathname = usePathname();
  const [isLoggedIn] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 0,
      title: 'Home',
      icon: '/assets/category.png',
      activeIcon: '/assets/category-dark.png',
      href: '/dashboard',
    },
    {
      id: 1,
      title: '일정 관리',
      icon: '/assets/book.png',
      activeIcon: '/assets/book-dark.png',
      href: '/calendar/daily',
    },
  ];

  return (
    <div className='bg-primary-0 relative w-[252px] shrink-0 px-[32px]'>
      <div className='text-primary-900 mt-[44px] text-center text-[24px] font-bold'>
        똘개비
      </div>
      <ul className='text-secondary-300 mt-[52px] flex flex-col gap-y-[24px]'>
        {navItems.map(navItem => (
          <Link
            href={navItem.href}
            key={navItem.id}
            className={`flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px] ${pathname === navItem.href ? 'text-secondary-500 rounded-[10px] bg-[#F5F5F7]' : 'hover:bg-[#F5F5F7]'}`}
          >
            <Image
              src={`${pathname === navItem.href ? navItem.activeIcon : navItem.icon}`}
              width={24}
              height={24}
              alt='category icon'
            />
            <span className='ml-[12px] text-[14px] font-semibold'>
              {navItem.title}
            </span>
          </Link>
        ))}
      </ul>

      <Link
        href={'/login'}
        className={`${isLoggedIn ? 'bg-[url(/assets/logout.png)] hover:bg-[url(/assets/logout-dark.png)]' : 'bg-[url(/assets/login.png)] hover:bg-[url(/assets/login-dark.png)]'} text-secondary-300 hover:text-secondary-500 absolute bottom-[24px] mx-[20px] flex cursor-pointer items-center bg-left bg-no-repeat py-[10px] hover:rounded-[10px]`}
      >
        {isLoggedIn ? (
          <span className='ml-[32px] text-[14px] font-semibold'>로그아웃</span>
        ) : (
          <span className='ml-[32px] text-[14px] font-semibold'>로그인</span>
        )}
      </Link>
    </div>
  );
}

export default Navigation;
