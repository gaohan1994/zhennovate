import React, { useRef, useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { chunk } from 'lodash';
import ProgramItem from '@/component/program';
import imgright from '@/assets/Icon-CircleArrow-Right@2x.png';
import imgleft from '@/assets/Icon-CircleArrow-Left@2x.png';

const prefix = 'program-child';

export default (props) => {
  const { cate, cateIndex, list, tab } = props;
  const swiperRef = useRef(null);
  const currentCatePrograms = list[cate];
  const renderProgramsChunk = chunk(currentCatePrograms, 3);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setTotal(renderProgramsChunk.length);
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
    <div key={cate}>
      <div className={`${prefix}-card-header`}>
        <div
          className={`${prefix}-card-title`}
          style={
            cateIndex === 0
              ? { marginTop: 16, color: '#15C3B1' }
              : { color: '#15C3B1' }
          }
          onClick={onChange}
        >
          {cate}
        </div>

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
      </div>

      <Carousel
        style={{ height: 360, width: 1128 }}
        dots={false}
        ref={swiperRef}
      >
        {renderProgramsChunk.map((chunkData, chunkIndex) => {
          return (
            <div key={chunkIndex}>
              <div
                className={`${prefix}`}
                style={{ justifyContent: 'flex-start' }}
              >
                {chunkData &&
                  chunkData.length > 0 &&
                  chunkData.map((item, index) => {
                    return (
                      <ProgramItem
                        style={(index + 1) % 3 !== 0 ? { marginRight: 24 } : {}}
                        type="card"
                        key={item?._id}
                        data={item || {}}
                        tab={tab}
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
};
