import { useState, useEffect } from "react";
import CircleIconComponent from "@/components/icons/CircleIconComponent";
import RingIconComponent from "@/components/icons/RingIconComponent";
import { Typography } from "@mui/material";

// Interface for component props
interface GraphicTimerProps {
  initialTime?: number; // Initial time for the timer (default 60 seconds)
  onComplete?: (status: "success" | "failed") => void; // Callback when the timer completes
  restart?: boolean; // Flag to restart the timer
  onRestart?: () => void; // Callback for restarting the timer
}

export default function CompleteLevelTimer({
  initialTime = 60,
  onComplete,
  restart = false,
  onRestart,
}: GraphicTimerProps) {
  // State to track remaining time
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // State to track the rotation of the circle
  const [rotation, setRotation] = useState(0);

  // State to track the current status: running, success, or failed
  const [status, setStatus] = useState<"running" | "success" | "failed">(
    "running"
  );

  // State to store the end time
  const [endTime, setEndTime] = useState<Date>(new Date());

  // Effect to restart the timer when 'restart' prop changes
  useEffect(() => {
    if (restart) {
      setTimeLeft(initialTime); // Reset time to initial value
      setStatus("running"); // Set status to running
      setEndTime(calculateEndTime(initialTime)); // Recalculate end time
      onRestart && onRestart(); // Call the onRestart callback if provided
    }
  }, [restart, initialTime, onRestart]); // Depend on 'restart' and 'initialTime' changes

  // Effect to handle the countdown and rotation
  useEffect(() => {
    if (timeLeft > 0 && status === "running") {
      // Set up interval for countdown
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1); // Decrease time by 1 second
      }, 1000);

      // Set up interval for rotating the circle icon
      const spinTimer = setInterval(() => {
        setRotation((prev) => (prev + 5) % 360); // Increase rotation by 5 degrees every 50ms
      }, 50);

      // Cleanup intervals when timer finishes or when the component unmounts
      return () => {
        clearInterval(timer);
        clearInterval(spinTimer);
      };
    } else if (timeLeft === 0 && status === "running") {
      setStatus("failed"); // Set status to failed when time reaches 0
      onComplete && onComplete("failed"); // Call onComplete callback with "failed" status
    }
  }, [timeLeft, status, onComplete]); // Depend on timeLeft, status, and onComplete changes

  // Effect to set the initial end time when the component mounts
  useEffect(() => {
    setEndTime(calculateEndTime(initialTime));
  }, [initialTime]);

  // Helper function to calculate the end time
  const calculateEndTime = (duration: number): Date => {
    const now = new Date();
    return new Date(now.getTime() + duration * 1000);
  };

  // Helper function to format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); // Get minutes part
    const secs = seconds % 60; // Get seconds part
    return `${minutes.toString().padStart(2, "0")} : ${secs
      .toString()
      .padStart(2, "0")}`; // Format time as MM:SS
  };

  // Helper function to format end time as HH:MM
  const formatEndTime = (date: Date) => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="flex flex-col items-center justify-center text-white rounded-2xl relative
                    w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[171px] lg:h-[171px]"
    >
      {/* Circle with rotating animation */}
      <div className="absolute  w-full h-full mx-auto my-auto ">
        <CircleIconComponent rotation={rotation} />{" "}
        {/* Pass rotation state to CircleIconComponent */}
      </div>
      <div className="flex flex-col items-center justify-center z-10 py-8">
        <span className="text-white md:my-3 my-1">
          <Typography variant="TM" sx={{ fontWeight: 700 }}>
            {" "}
            Time For Payment{" "}
          </Typography>
        </span>
        <span className="mb-3 text-[#40A578]">
          <Typography variant="SH"> {formatTime(timeLeft)}</Typography>
        </span>
        <div className="flex items-center ">
          <span className="mr-1">
            {" "}
            <RingIconComponent />
          </span>
          <span className="text-white">
            <Typography variant="TH"> {formatEndTime(endTime)}</Typography>
          </span>{" "}
        </div>
      </div>
      {/* Success message when payment is successful */}
      {status === "success" && (
        <div className="mt-2 text-green-500 font-bold text-[10px] sm:text-xs">
          Payment Successful!
        </div>
      )}
      {/* Failure message when payment fails */}
      {status === "failed" && (
        <div className="mt-2 text-[#F66066] font-bold text-[10px] sm:text-xs">
          Payment Failed!
        </div>
      )}
    </div>
  );
}
