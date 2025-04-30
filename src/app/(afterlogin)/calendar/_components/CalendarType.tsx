'use client';

import { ScheduleItem } from '@/app/_types/calendar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function CalendarType() {
  const pathname = usePathname();

  const scheduleTypes: ScheduleItem[] = [
    { id: 0, title: 'Day', href: '/calendar/daily' },
    { id: 1, title: 'Week', href: '/calendar/weekly' },
    { id: 2, title: 'Month', href: '/calendar/monthly' },
  ];

  return (
    <div className='flex gap-[20px]'>
      {scheduleTypes.map(type => (
        <Link
          href={type.href}
          key={type.id}
          className={`border-primary-200 cursor-pointer rounded-[10px] border-1 px-[24px] py-[6px] text-[16px] font-semibold sm:px-[44px] sm:py-[8px] sm:text-[20px] ${pathname === type.href && 'bg-primary-400 text-primary-0'}`}
        >
          {type.title}
        </Link>
      ))}
    </div>
  );
}

export default CalendarType;
