import * as React from "react";

interface DiamondsIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop
}

const DiamondsIconComponent: React.FC<DiamondsIconProps> = ({
  size = 29, // Default size
  color = "white", // Default color
  ...props // Spread the rest of the props
}) => (
  <svg
    width={size}
    height={(size * 23) / 29} // Maintain aspect ratio based on original dimensions
    viewBox="0 0 29 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Allow passing additional SVG props
  >
    <path
      d="M1.5835 8.91602L5.98326 2.31637C6.46238 1.59769 7.26897 1.16602 8.13272 1.16602H14.5002M1.5835 8.91602L14.5002 21.8327M1.5835 8.91602H27.4168M14.5002 1.16602L19.6668 8.91602L14.5002 21.8327M14.5002 1.16602L9.3335 8.91602L14.5002 21.8327M14.5002 1.16602H20.8676C21.7313 1.16602 22.5379 1.59769 23.017 2.31637L27.4168 8.91602M14.5002 21.8327L27.4168 8.91602"
      stroke={color} // Use color prop for the stroke
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DiamondsIconComponent;
