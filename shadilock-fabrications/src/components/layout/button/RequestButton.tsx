import React from "react";

interface RequestButtonProps {
  text?: string;
  onClick?: () => void;
}

const RequestButton: React.FC<RequestButtonProps> = ({
  text = "Request a Service",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="
        px-6 py-3
        bg-orange text-blue font-semibold
        rounded-lg
        shadow-md
        hover:bg-orangeHover
        focus:outline-none focus:ring-2 focus:ring-orangeHover focus:ring-offset-2 focus:ring-offset-blue
        transition
        w-full sm:w-auto
      "
    >
      {text}
    </button>
  );
};

export default RequestButton;
