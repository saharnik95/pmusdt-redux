import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import CircleIconComponent from "@/components/icons/CircleIconComponent";

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

  return (
    <div
      className="flex flex-col items-center justify-center text-white rounded-2xl relative
                    w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[171px] lg:h-[171px]"
    >
      <div className="absolute inset-0 w-full h-full p-2">
        <CircleIconComponent rotation={rotation} />
      </div>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-[10px] sm:text-xs md:text-sm mb-1">
          Time For Payment
        </span>
        <span className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
          {formatTime(timeLeft)}
        </span>
        <div className="flex items-center">
          <Bell size={10} className="mr-1" />
          <span className="text-[10px] sm:text-xs">15 : 30</span>
        </div>
      </div>
      {status === "success" && (
        <div className="mt-2 text-green-500 font-bold text-[10px] sm:text-xs">
          Payment Successful!
        </div>
      )}
      {status === "failed" && (
        <div className="mt-2 text-[#F66066] font-bold text-[10px] sm:text-xs">
          Payment Failed!
        </div>
      )}
    </div>
  );
}
