import { useEffect, useState } from 'react';

export default function useGetComputedStyle() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [getComputedStyle, setValue] = useState<any>(
    () => window.getComputedStyle,
  );

  useEffect(
    () => {
      const handler = () => {
        setValue(() => window.getComputedStyle);
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    },
    [],
  );

  return getComputedStyle;
}
