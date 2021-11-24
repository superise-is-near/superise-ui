import React, { Fragment } from 'react';

function Card(props : {
  title?: String;
  children: any;
}) {
  return <div className="bg-white rounded-lg px-4 py-5">
    {props.title && <h2 className="text-lg font-bold">{props.title}</h2>}
    {props.children}
    </div>
}

export default Card;
