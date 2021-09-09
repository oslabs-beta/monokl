import React from 'react';

// const data = {
//   value: ['1']
// }

const ScoreCard = (props) => (
  <>
    <h1 className='title'>{props.metricName}</h1>
    <div className='scoreCard'>
      <span>{props.data}</span>
    </div>
  </>
);

export default ScoreCard;