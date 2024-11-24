import * as React from "react";

interface PartnerIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string; // Add custom prop
}

const PartnerIconComponent: React.FC<PartnerIconProps> = ({
  color = "#ABABAB",
  ...props
}) => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 19V15C1 13.8954 1.89543 13 3 13H9M14 5C14 7.20914 12.2091 9 10 9C7.79086 9 6 7.20914 6 5C6 2.79086 7.79086 1 10 1C12.2091 1 14 2.79086 14 5ZM16 11C16 13.2091 14.2091 15 12 15C14.2091 15 16 16.7909 16 19C16 16.7909 17.7909 15 20 15C17.7909 15 16 13.2091 16 11Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PartnerIconComponent;
