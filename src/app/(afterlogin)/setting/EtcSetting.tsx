import SubmitButton from '@/app/_components/common/SubmitButton';
import NewsSetting from './_settings/NewsSetting';
import WeatherLocationSetting from './_settings/WeatherLocationSetting';
import RouteSetting from './_settings/RouteSetting';
import SettingContainer from './_component/SettingContainer';
import { useNewsCategoryStore } from '@/app/store/newsCategoryStore';
import { useState } from 'react';
import { NewsCategoryType } from '@/app/_types/news';

function EtcSetting() {
  const { newsCategories, setCategories } = useNewsCategoryStore();
  const [selectedCategory, setSelectedCategory] =
    useState<NewsCategoryType[]>(newsCategories);

  const saveSetting = () => {
    setCategories(selectedCategory);
  };

  return (
    <div className='flex h-full min-h-[400px] flex-col'>
      <div className='mb-[108px] flex flex-1 flex-col gap-[32px]'>
        <SettingContainer title='뉴스 Topic'>
          <NewsSetting
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </SettingContainer>
        <SettingContainer title='날씨 표시 위치'>
          <WeatherLocationSetting />
        </SettingContainer>
        <SettingContainer title='경로 조회 옵션'>
          <RouteSetting />
        </SettingContainer>
      </div>

      <SubmitButton className='sm:max-w-[216px]' onClick={saveSetting}>
        저장
      </SubmitButton>
    </div>
  );
}

export default EtcSetting;
