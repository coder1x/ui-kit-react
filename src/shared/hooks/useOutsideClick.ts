import React, { useEffect } from 'react';

const useOutsideClick = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (!ref) return;

      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
