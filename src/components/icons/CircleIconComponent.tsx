import * as React from "react";

interface CircleIconProps extends React.SVGProps<SVGSVGElement> {
  rotation: number;
  className?: string;
}

const CircleIconComponent: React.FC<CircleIconProps> = ({
  rotation,
  className,
  ...props
}) => (
  <svg
    className={`absolute top-0 left-0 w-full h-full ${className}`}
    viewBox="0 0 200 200"
    {...props}
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="16.88%" stopColor="#2A3342" />
        <stop offset="85.61%" stopColor="#40A578" />
      </linearGradient>
    </defs>
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="none"
      stroke="#414E63"
      strokeWidth="1"
    />
    <path
      d="M100 10 A90 90 0 0 1 190 100"
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="1"
      strokeLinecap="round"
      transform={`rotate(${rotation}, 100, 100)`}
    />
    <circle
      cx="190"
      cy="100"
      r="6"
      fill="#40A578"
      filter="drop-shadow(0px 0px 4px rgba(64, 165, 120, 0.6))"
      transform={`rotate(${rotation}, 100, 100)`}
    />
  </svg>
);

export default CircleIconComponent;
