import * as React from "react";

// Define props interface, extending standard SVG props
interface DashboardIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string; // Custom prop for stroke color
}

const DashboardIconComponent: React.FC<DashboardIconProps> = ({
  color = "white", // Default stroke color
  ...props // Other SVG props
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Spread additional props
  >
    <path
      d="M1 8.25V18C1 18.5523 1.44772 19 2 19H6.5C7.05228 19 7.5 18.5523 7.5 18V13.5C7.5 12.1193 8.6193 11 10 11C11.3807 11 12.5 12.1193 12.5 13.5V18C12.5 18.5523 12.9477 19 13.5 19H18C18.5523 19 19 18.5523 19 18V8.25C19 7.93524 18.8518 7.63885 18.6 7.45L10 1L1.4 7.45C1.14819 7.63885 1 7.93524 1 8.25Z"
      stroke={color} // Apply the color prop
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DashboardIconComponent;
