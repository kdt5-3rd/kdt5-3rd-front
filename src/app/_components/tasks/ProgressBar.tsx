interface ProgressBarProps {
  finishedTaskCount: number;
  totalTaskCount: number;
}

function ProgressBar({ finishedTaskCount, totalTaskCount }: ProgressBarProps) {
  return (
    <div className='relative h-[8px] rounded-[8px] bg-[#546fff47]'>
      <div
        className='bg-primary-500 h-[8px] rounded-[8px]'
        style={{
          width: `${(finishedTaskCount / totalTaskCount) * 100}%`,
        }}
      ></div>
      <div
        className='bg-primary-500 border-primary-0 absolute top-[-4px] h-[16px] w-[16px] rounded-[16px] border-2'
        style={{
          left: `${(finishedTaskCount / totalTaskCount) * 100}%`,
          transform: 'translateX(-8px)',
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
