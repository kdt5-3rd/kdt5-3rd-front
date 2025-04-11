'use client';

import Image from 'next/image';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import NormalInput from '../common/NormalInput';
import SubmitButton from '../common/SubmitButton';
import { searchLocation } from '@/app/_apis';
import useOutsideClick from '@/app/_hooks';

interface LocationModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPlaceName: (name: string) => void;
}

interface SearchResult {
  title: string;
  address: string;
  category: string;
  description: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  telephone: string;
}

function LocationModal({ setIsOpen, setPlaceName }: LocationModalProps) {
  const locationRef = useOutsideClick(() => setIsOpen(false));
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchPlace, setSearchPlace] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleCloseButton = () => {
    setIsOpen(false);
  };

  const handleSearchButton = async () => {
    if (!searchPlace.trim()) {
      setSearchPlace('');
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchLocation(searchPlace);

      if (!results) {
        return console.error('API 호출에 실패했습니다.');
      }

      setSearchResults(results.data);
    } catch (error) {
      console.error('API 호출 중 에러가 발생했습니다:', error);
    }

    setSearchPlace('');
  };

  const handleSelectPlace = (selectedTitle: string) => {
    setPlaceName(selectedTitle);
    setIsOpen(false);
  };

  return (
    <div
      ref={locationRef}
      className='bg-primary-0 absolute top-1/2 left-1/2 w-[550px] -translate-x-1/2 -translate-y-1/2 transform rounded-[10px] p-2.5 px-[40px] py-[30px] shadow-[0_0_30px_0_rgba(84,87,122,0.7)]'
    >
      <div className='mb-[30px] flex justify-between'>
        <p className='text-[24px] font-semibold'>장소 검색</p>
        <button
          onClick={handleCloseButton}
          className='bg-primary-400 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-[10px]'
        >
          <Image
            src='/assets/close-white.png'
            alt='close button'
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className='px-[10px]'>
        <div className='mb-[10px] flex justify-between'>
          <NormalInput
            ref={inputRef}
            className='mr-[10px] flex-grow'
            placeholder='장소를 검색하세요'
            value={searchPlace}
            onChange={e => setSearchPlace(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchButton();
                inputRef.current?.blur();
              }
            }}
            required
          ></NormalInput>
          <SubmitButton
            type='button'
            className='pr-[22px] pl-[22px] font-semibold'
            onClick={handleSearchButton}
          >
            검색
          </SubmitButton>
        </div>
        <div className='flex h-[230px] flex-col gap-y-[10px] overflow-auto'>
          {searchResults.length === 0 ? (
            <div className='flex h-full items-center justify-center'>
              검색 결과가 없습니다.
            </div>
          ) : (
            <>
              {searchResults.map(result => {
                const cleanTitle = result.title.replace(/<[^>]*>/g, '');

                return (
                  <div
                    key={`${result.mapx}-${result.mapy}`}
                    className='border-primary-200 hover:bg-primary-100 cursor-pointer rounded-[10px] border-1 p-[16px]'
                    onClick={() => {
                      handleSelectPlace(cleanTitle);
                    }}
                  >
                    <div className='font-regular text-[16px]'>{cleanTitle}</div>
                    <div className='font-regular text-[12px]'>
                      {result.address}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationModal;
