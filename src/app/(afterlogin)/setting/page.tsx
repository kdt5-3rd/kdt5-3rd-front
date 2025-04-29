'use client';

import BoardTitle from '@/app/_components/common/BoardTitle';
import {
  TabButton,
  TabHeader,
  TabPanel,
  TabProvider,
} from '@/app/_components/common/Tab';
import Navigation from '@/app/_components/nav/Navigation';
import NoticeSetting from './NoticeSetting';
import EtcSetting from './EtcSetting';

export default function News() {
  return (
    <div className='text-secondary-500 flex h-full min-h-screen flex-col sm:min-w-[1440px] sm:flex-row'>
      <Navigation />
      <div className='h-dvh min-h-dvh w-dvw min-w-[400px] bg-[#FAFAFA] sm:min-w-[752px]'>
        <div className='bg-primary-0 flex flex-col'>
          <BoardTitle title='설정' />
        </div>
        <div className='flex w-full flex-col gap-[20px] p-[32px]'>
          <div className='bg-primary-0 border-primary-200 rounded-[10px] border p-[30px]'>
            <TabProvider defaultTabId={0}>
              <TabHeader>
                <TabButton id={0}>알림</TabButton>
                <TabButton id={1}>기타</TabButton>
              </TabHeader>
              <TabPanel id={0}>
                <NoticeSetting />
              </TabPanel>
              <TabPanel id={1}>
                <EtcSetting />
              </TabPanel>
            </TabProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
