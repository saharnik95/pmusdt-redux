import * as React from "react";

interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

const EyeIconComponent: React.FC<EyeIconProps> = ({
  color = "currentColor",
  ...props
}) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_76_16)">
      <path
        d="M0.666748 8.00008C0.666748 8.00008 3.33341 2.66675 8.00008 2.66675C12.6667 2.66675 15.3334 8.00008 15.3334 8.00008"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666748 8C0.666748 8 3.33341 13.3333 8.00008 13.3333C12.6667 13.3333 15.3334 8 15.3334 8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10C9.1046 10 10 9.1046 10 8C10 6.8954 9.1046 6 8 6C6.8954 6 6 6.8954 6 8C6 9.1046 6.8954 10 8 10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_76_16">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default EyeIconComponent;
