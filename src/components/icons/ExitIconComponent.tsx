import * as React from "react";

interface ExitIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string; // Add custom prop
}

const ExitIconComponent: React.FC<ExitIconProps> = ({
  color = "#ABABAB",
  ...props
}) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Spread other props
  >
    <path
      d="M7 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H7M14.5 5.5L19 10L14.5 14.5M7 10H18"
      stroke={color} // Use the custom color prop
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExitIconComponent;
