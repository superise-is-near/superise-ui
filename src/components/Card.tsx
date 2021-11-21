import React, { Fragment } from 'react';

function Card(props) {
  return <div className="bg-white rounded-lg px-4 py-5">
    {props.children}
    </div>
}

export default Card;
