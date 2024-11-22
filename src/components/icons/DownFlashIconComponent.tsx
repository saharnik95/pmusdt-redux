import * as React from "react";

const DownFlashIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 8L10 12L6 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DownFlashIconComponent;
