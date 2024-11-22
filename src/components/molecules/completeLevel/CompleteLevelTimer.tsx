import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

interface GraphicTimerProps {
  initialTime?: number;
  onComplete?: (status: "success" | "failed") => void;
  restart?: boolean;
  onRestart?: () => void;
}

export default function CompleteLevelTimer({
  initialTime = 60,
  onComplete,
  restart = false,
  onRestart,
}: GraphicTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [rotation, setRotation] = useState(0);
  const [status, setStatus] = useState<"running" | "success" | "failed">(
    "running"
  );

  useEffect(() => {
    if (restart) {
      setTimeLeft(initialTime);
      setStatus("running");
      onRestart && onRestart();
    }
  }, [restart, initialTime, onRestart]);

  useEffect(() => {
    if (timeLeft > 0 && status === "running") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      const spinTimer = setInterval(() => {
        setRotation((prev) => (prev + 5) % 360);
      }, 50);

      return () => {
        clearInterval(timer);
        clearInterval(spinTimer);
      };
    } else if (timeLeft === 0 && status === "running") {
      setStatus("failed");
      onComplete && onComplete("failed");
    }
  }, [timeLeft, status, onComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`;
  };
  {
    /*  const handleSuccess = () => {
    setStatus("success");
    onComplete && onComplete("success");
  }; */
  }

  return (
    <div className="flex flex-col items-center justify-center p-2 text-white rounded-2xl w-[140px] h-[140px] relative">
      <svg
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 136 136"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="16.88%" stopColor="#2A3342" />
            <stop offset="85.61%" stopColor="#40A578" />
          </linearGradient>
        </defs>
        <circle
          cx="68"
          cy="68"
          r="67"
          fill="none"
          stroke="#414E63"
          strokeWidth="1"
        />
        <path
          d="M68 1 A67 67 0 0 1 135 68"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${rotation}, 68, 68)`}
        />
        <circle
          cx="135"
          cy="68"
          r="6"
          fill="#40A578"
          filter="drop-shadow(0px 0px 4px rgba(64, 165, 120, 0.6))"
          transform={`rotate(${rotation}, 68, 68)`}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-xs mb-1">Time For Payment</span>
        <span className="text-2xl font-bold mb-1">{formatTime(timeLeft)}</span>
        <div className="flex items-center">
          <Bell size={12} className="mr-1" />
          <span className="text-xs">15 : 30</span>
        </div>
      </div>
      {status === "success" && (
        <div className="mt-4 text-green-500 font-bold">Payment Successful!</div>
      )}
      {status === "failed" && (
        <div className="mt-4 text-red-500 font-bold">Payment Failed!</div>
      )}
    </div>
  );
}
