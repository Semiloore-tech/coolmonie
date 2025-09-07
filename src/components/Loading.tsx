import React from "react";

interface LoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  type?: "skeleton" | "spinner" | "pulse";
}

const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  size = "md",
  type = "skeleton"
}) => {
  const sizes = {
    sm: { icon: "w-6 h-6", bar: "w-12 h-2", container: "w-[120px] h-[60px]", text: "text-xs" },
    md: { icon: "w-8 h-8", bar: "w-16 h-3", container: "w-[150px] h-[80px]", text: "text-sm" },
    lg: { icon: "w-10 h-10", bar: "w-20 h-4", container: "w-[180px] h-[100px]", text: "text-base" },
  };

  const renderSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizes[size].icon} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin`} />
      {text && (
        <p className={`text-gray-600 ${sizes[size].text} font-medium animate-pulse`}>{text}</p>
      )}
    </div>
  );

  const renderPulse = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizes[size].icon} bg-blue-500 rounded-full animate-pulse`} />
      {text && (
        <p className={`text-gray-600 ${sizes[size].text} font-medium`}>{text}</p>
      )}
    </div>
  );

  const renderSkeleton = () => (
    <>
      {/* Circle Skeleton */}
      <div className={`${sizes[size].icon} bg-gray-300 rounded-full animate-pulse`} />
      {/* Text Bar Skeleton */}
      <div className={`${sizes[size].bar} mt-3 bg-gray-300 rounded-md animate-pulse`} />
      {/* Optional text below */}
      {text && (
        <p className={`mt-2 text-gray-400 ${sizes[size].text} font-medium`}>{text}</p>
      )}
    </>
  );

  const getContent = () => {
    switch (type) {
      case "spinner":
        return renderSpinner();
      case "pulse":
        return renderPulse();
      default:
        return renderSkeleton();
    }
  };

  // For spinner and pulse types, use flexible container
  if (type === "spinner" || type === "pulse") {
    return (
      <div
        className="flex items-center justify-center p-4 min-h-[60px]"
        role="status"
        aria-label={text}
      >
        {getContent()}
        <span className="sr-only">{text}</span>
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size].container} bg-white rounded-2xl flex flex-col items-center justify-center p-4 shadow-md`}
      role="status"
      aria-label={text}
    >
      {getContent()}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default Loading;