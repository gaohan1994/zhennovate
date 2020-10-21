import React from 'react';
import { Link } from 'react-router-dom';
export default (props) => {
  const { id } = props.match.params;
  return (
    <div>
      <Link to={`/program/detail/${id}`}>to detail</Link>
    </div>
  );
};
