import React from "react";

function RevealTime() {
  return (
    <section className="w-full mt-2">
      <div className="p-4 flex justify-between border border-gray-300 rounded-t-2xl">
        <div>Date</div>
        <div>30.01.2022</div>
      </div>
      <div className="p-4 flex justify-between border border-t-0 border-gray-300 rounded-b-2xl">
        <div>Time</div>
        <div>16:30pm GMT</div>
      </div>
    </section>
  );
}

export default RevealTime;
