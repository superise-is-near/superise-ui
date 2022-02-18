import React from "react";
import dayjs from "dayjs";

export interface RevealTimeProps {
  endDate: string;
  setEndDate: (endDate: string) => void;
  endHour: string;
  setEndHour: (endHour: string) => void;
}

function RevealTime(props: RevealTimeProps) {
  const { endDate, setEndDate, endHour, setEndHour } = props;
  return (
    <section className="w-full mt-2 bg-white">
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-t-2xl">
        <div>Date</div>
        <input
          style={{ width: "160px" }}
          value={endDate}
          name="end_day"
          type="date"
          placeholder=""
          className="block border-0 rounded"
          min={dayjs().format("YYYY-MM-DD")}
          onChange={(e) => {
            const value = e.target.value;
            sessionStorage.setItem("endDate", value);
            setEndDate(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-between p-4 border border-t-0 border-gray-300 rounded-b-2xl">
        <div>Time</div>
        <input
          style={{ width: "160px" }}
          value={endHour}
          name="end_hour"
          type="time"
          placeholder=""
          className="block border-0 rounded"
          min={dayjs().add(1, "m").format("HH:mm")}
          onChange={(e) => {
            const value = e.target.value;
            sessionStorage.setItem("endHour", value);
            setEndHour(e.target.value);
          }}
        />
      </div>
    </section>
  );
}

export default RevealTime;
