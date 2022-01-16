import React from "react";

export default function Logo({ color = "black" }: { color?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="8" fill={color} />
      <circle cx="24" cy="8" r="8" fill={color} />
      <circle cx="8" cy="24" r="8" fill={color} />
      <circle cx="24" cy="24" r="8" fill={color} />
    </svg>
  );
}
