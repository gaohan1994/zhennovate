import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from 'antd';
import ProgramItem from '@/component/program';
import imgright from '@/assets/Icon-CircleArrow-Right@2x.png';
import imgleft from '@/assets/Icon-CircleArrow-Left@2x.png';
import Sort from '../sort';
import '@/pages/index/program/child/index.less';

const prefix = 'program-child';

function Swiper(props) {
  const { title, subTitle, height, width, data = [], renderData } = props;
  const swiperRef = useRef(null);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTotal(data.length);
    setCurrent(1);
  }, []);

  const onChange = (type) => {
    if (type === 'prev' && current > 1) {
      swiperRef.current?.prev();
      setCurrent((prevCurrent) => prevCurrent - 1);
    } else if (type === 'next' && current < total) {
      swiperRef.current?.next();
      setCurrent((prevCurrent) => prevCurrent + 1);
    }
  };

  return (
    <div>
      <Sort
        title={title}
        subTitle={subTitle}
        showSort={false}
        renderSort={() => {
          return (
            <div className={`${prefix}-card-bar`}>
              <span>{`${current} / ${total}`}</span>
              <div
                onClick={() => onChange('prev')}
                className={`${prefix}-card-icon`}
                style={{ backgroundImage: `url(${imgleft})` }}
              />
              <div
                onClick={() => onChange('next')}
                className={`${prefix}-card-icon`}
                style={{ backgroundImage: `url(${imgright})` }}
              />
            </div>
          );
        }}
      />

      <Carousel
        style={{ height: height || 360, width: width || 1128 }}
        dots={false}
        ref={swiperRef}
      >
        {data.map((chunkData, chunkIndex) => {
          return (
            <div key={chunkIndex}>
              <div
                className={`${prefix}`}
                style={{ justifyContent: 'flex-start' }}
              >
                {chunkData &&
                  chunkData.length > 0 &&
                  chunkData.map((item, index) => {
                    if (renderData) {
                      return renderData(item, index);
                    }
                    return (
                      <ProgramItem
                        style={(index + 1) % 3 !== 0 ? { marginRight: 24 } : {}}
                        type="card"
                        key={item?._id}
                        data={item || {}}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Swiper;

export { Swiper };
