import * as React from "react";

// Defining the props for the CircleIcon component
interface CircleIconProps extends React.SVGProps<SVGSVGElement> {
  rotation: number; // The rotation angle for the circle and the path
  className?: string; // Optional class name for styling the SVG
}

const CircleIconComponent: React.FC<CircleIconProps> = ({
  rotation, // The rotation value passed to the component
  className, // The className to apply for custom styling (optional)
  ...props // Other props like width, height, etc. are passed down to the SVG element
}) => (
  // The SVG element itself which will render the icon
  <svg
    className={`absolute w-full h-full ${className}`} // Applies positioning and full width/height with optional className
    viewBox="-4 -4 180 180" // Adjusts the viewBox to give extra space for the circle
    {...props} // Spread operator to pass any additional SVG props to the <svg> element (e.g., width, height)
  >
    {/* Defining a linear gradient for the stroke color of the path */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        {/* Gradient stop points for the gradient effect */}
        <stop offset="16.88%" stopColor="#2A3342" />{" "}
        {/* Darker color at 16.88% of the gradient */}
        <stop offset="85.61%" stopColor="#40A578" />{" "}
        {/* Lighter green color at 85.61% of the gradient */}
      </linearGradient>
    </defs>

    {/* Circle element representing the border of the circle (background circle) */}
    <circle
      cx="86" // X-axis center of the circle
      cy="86" // Y-axis center of the circle
      r="85" // Radius of the circle
      fill="none" // No fill color, just the stroke is visible
      stroke="#414E63" // Stroke color of the circle
      strokeWidth="1" // Stroke thickness
    />

    {/* Path element representing the rotating arc of the circle */}
    <path
      d="M86 1 A85 85 0 0 1 171 86" // Arc path starting from the top (86, 1) to the right edge (171, 86)
      fill="none" // No fill color for the arc
      stroke="url(#gradient)" // Applying the gradient defined above to the arc's stroke
      strokeWidth="1" // Stroke thickness of the arc
      strokeLinecap="round" // Rounded ends for the path stroke
      transform={`rotate(${rotation}, 86, 86)`} // Rotates the arc around the center (86, 86) by the given `rotation` value
    />

    {/* Circle element representing the small circle at the end of the arc */}
    <circle
      cx="171" // X-axis position of the small circle
      cy="86" // Y-axis position of the small circle (on the edge of the large circle)
      r="5" // Radius of the small circle
      fill="#40A578" // Fill color of the small circle (green)
      filter="drop-shadow(0px 0px 4px rgba(64, 165, 120, 0.6))" // Applies a drop shadow effect to the small circle
      transform={`rotate(${rotation}, 86, 86)`} // Rotates the small circle around the center by the `rotation` value
    />
  </svg>
);

export default CircleIconComponent;
