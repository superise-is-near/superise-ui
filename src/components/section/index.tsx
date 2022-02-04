import React from "react";

const Section = ({ children }: { children?: any }) => {
  return (
    <div className="px-4 py-4 bg-white border border-gray-300 rounded-2xl">
      {children}
    </div>
  );
};

export default Section;
