import React from "react";

export default function Logo({
  color = "black",
  size = "32",
}: {
  color?: string;
  size: string;
}) {
  return (
    <svg
      width={size}
      height={size}
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
