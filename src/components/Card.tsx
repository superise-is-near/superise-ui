import React, { Fragment } from 'react';

function Card({ children }) {
  return <div className="bg-white rounded-lg px-4 py-5">
    {children}
    </div>
}

export default Card;
