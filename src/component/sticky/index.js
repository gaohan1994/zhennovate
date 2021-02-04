import { useScroll } from 'ahooks';
import { useEffect, useState } from 'react';

function useStickyComponent(distance, stickyContainer) {
  const { top } = useScroll(document);

  /**
   * @param loading 是否加载中
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof top === 'number') {
      setLoading(false);
    }
  }, [top]);

  /**
   * @param isSticky 是否sticky
   */
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!loading) {
      const is = top >= distance; // 计算触发sticky的距离
      setIsSticky(is);
    }
  }, [loading, top]);

  /**
   * @param offsetLeft 距离左边距离
   */
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
    loading,
  };
}

export default useStickyComponent;

export { useStickyComponent };
