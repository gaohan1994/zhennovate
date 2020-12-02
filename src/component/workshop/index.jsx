import React from 'react';
import '../program/index.less';

const prefix = 'component-program';

function Workshop(props) {
  const { style = {}, data } = props;
  return (
    <div className={`${prefix} ${prefix}-fix`} style={{ ...style }}>
      <div
        className={`${prefix}-cover`}
        style={{ backgroundImage: `url(${data.Cover})` }}
      />
      <div className={`${prefix}-content`}>
        <span>Type of Event</span>
        <span className={`${prefix}-content-title`}>
          Workshop title written here. Workshop title written here.
        </span>
        <span className={`${prefix}-content-time`}>
          Monday, Sept 20 3pm - 4pm EST
        </span>

        <div className={`${prefix}-content-rsvp`}>{`RSVP ->`}</div>
      </div>
    </div>
  );
}

export default Workshop;

export { Workshop };
