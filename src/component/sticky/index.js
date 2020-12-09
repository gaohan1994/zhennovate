import { useScroll } from 'ahooks';
import { useEffect, useState } from 'react';

function useStickyComponent(distance, stickyContainer) {
  const { top } = useScroll(document);
  const isSticky = top >= distance; // 计算触发sticky的距离

  const [offsetLeft, setOffsetleft] = useState(-1);

  const onResize = () => {
    setOffsetleft(stickyContainer.current?.offsetLeft);
  };

  useEffect(() => {
    if (stickyContainer.current?.offsetLeft) {
      setOffsetleft(stickyContainer.current?.offsetLeft);
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [stickyContainer.current]);

  return {
    isSticky,
    left: offsetLeft,
  };
}

export default useStickyComponent;

export { useStickyComponent };
