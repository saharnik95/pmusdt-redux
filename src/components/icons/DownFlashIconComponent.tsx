import * as React from "react";

const DownFlashIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 8L12 16L4 8"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default DownFlashIconComponent;
