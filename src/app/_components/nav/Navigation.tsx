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
  const [isOpen, setIsOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 0,
      title: 'Home',
      icon: '/assets/category.png',
      activeIcon: '/assets/category-dark.png',
      href: '/',
    },
    {
      id: 1,
      title: '일정 관리',
      icon: '/assets/book.png',
      activeIcon: '/assets/book-dark.png',
      href: '/calendar/daily',
    },
    {
      id: 2,
      title: '날씨',
      icon: '/assets/sun.png',
      activeIcon: '/assets/sun.png',
      href: '/weather',
    },
  ];

  const handleNavClick = (href: string) => {
    if (pathname === href) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='text-secondary-500 bg-primary-0 border-primary-100 z-10 flex min-w-[400px] items-center justify-between border-b-1 px-[24px] py-[20px] sm:hidden'>
        <span className='text-primary-900 text-[24px] font-bold'>똘개비</span>
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className='border-primary-300 cursor-pointer rounded-full border-1 p-[10px]'
        >
          <Image src='/assets/menu.png' width={24} height={24} alt='menu' />
        </button>
      </div>
      {isOpen && (
        <>
          <div
            className='bg-secondary-400 fixed inset-0 opacity-30 sm:hidden'
            onClick={() => setIsOpen(false)}
          />
          <div className='bg-primary-0 absolute top-[86px] w-full px-[20px] py-[18px] shadow-md sm:hidden'>
            <ul className='text-secondary-300 flex flex-col gap-y-[12px]'>
              {navItems.map(navItem => (
                <Link
                  className={`flex cursor-pointer items-center px-[20px] py-[10px] hover:rounded-[10px] ${pathname === navItem.href ? 'text-secondary-500 rounded-[10px] bg-[#F5F5F7]' : 'hover:bg-[#F5F5F7]'}`}
                  href={navItem.href}
                  key={navItem.id}
                  onClick={() => handleNavClick(navItem.href)}
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
          </div>
        </>
      )}
      <div className='bg-primary-0 relative hidden w-[252px] shrink-0 px-[32px] sm:block'>
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
            <span className='ml-[32px] text-[14px] font-semibold'>
              로그아웃
            </span>
          ) : (
            <span className='ml-[32px] text-[14px] font-semibold'>로그인</span>
          )}
        </Link>
      </div>
    </>
  );
}

export default Navigation;
