import React from 'react';
import '../index.less';
import Sort from '@/component/sort';

const prefix = 'page-insights';

function Assessment() {
  return (
    <div>
      <Sort title="Assessment results" showSort={false} />
      <div className={`${prefix}-card`}>Assessment</div>
    </div>
  );
}

export default Assessment;
export { Assessment };
