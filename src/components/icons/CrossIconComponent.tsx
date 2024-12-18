import * as React from "react";

const CrossIconComponent: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.6666 5.3335L7.99992 8.00016M7.99992 8.00016L5.33325 10.6668M7.99992 8.00016L5.33325 5.3335M7.99992 8.00016L10.6666 10.6668M14.6666 8.00016C14.6666 11.682 11.6818 14.6668 7.99992 14.6668C4.31802 14.6668 1.33325 11.682 1.33325 8.00016C1.33325 4.31826 4.31802 1.3335 7.99992 1.3335C11.6818 1.3335 14.6666 4.31826 14.6666 8.00016Z"
      stroke="#F66066"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CrossIconComponent;
