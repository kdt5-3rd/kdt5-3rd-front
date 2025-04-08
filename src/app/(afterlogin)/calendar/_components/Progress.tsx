import ProgressBar from '@/app/_components/tasks/ProgressBar';

interface ProgressProps {
  finishedTaskCount: number;
  totalTaskCount: number;
}

function Progress({ finishedTaskCount, totalTaskCount }: ProgressProps) {
  return (
    <div className='flex max-w-[752px] items-center justify-between gap-[20px] text-[20px] font-semibold'>
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
