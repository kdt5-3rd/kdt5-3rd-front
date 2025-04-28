import SubmitButton from '@/app/_components/common/SubmitButton';
import NewsSetting from './_settings/NewsSetting';
import WeatherLocationSetting from './_settings/WeatherLocationSetting';
import RouteSetting from './_settings/RouteSetting';
import SettingContainer from './_component/SettingContainer';

function EtcSetting() {
  return (
    <div className='flex h-full min-h-[400px] flex-col'>
      <div className='mb-[108px] flex flex-1 flex-col gap-[32px]'>
        <SettingContainer title='뉴스 Topic'>
          <NewsSetting />
        </SettingContainer>
        <SettingContainer title='날씨 표시 위치'>
          <WeatherLocationSetting />
        </SettingContainer>
        <SettingContainer title='경로 조회 옵션'>
          <RouteSetting />
        </SettingContainer>
      </div>

      <SubmitButton className='max-w-[216px]'>저장</SubmitButton>
    </div>
  );
}

export default EtcSetting;
