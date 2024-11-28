import * as React from "react";

const MultipleIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L15 15M1 15L15 1"
      stroke="#ABABAB"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default MultipleIconComponent;
