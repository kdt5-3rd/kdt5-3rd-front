import ProgressBar from '@/app/_components/tasks/ProgressBar';

interface ProgressProps {
  finishedTaskCount: number;
  totalTaskCount: number;
}

function Progress({ finishedTaskCount, totalTaskCount }: ProgressProps) {
  return (
    <div className='flex min-w-[400px] items-center justify-between gap-[20px] text-[16px] font-semibold sm:max-w-[752px] sm:text-[20px]'>
      <span className='whitespace-nowrap'>달성률</span>
      <div className='w-full'>
        <ProgressBar
          finishedTaskCount={finishedTaskCount}
          totalTaskCount={totalTaskCount}
        />
      </div>
      <span className='whitespace-nowrap'>{`${finishedTaskCount} / ${totalTaskCount}`}</span>
    </div>
  );
}

export default Progress;
