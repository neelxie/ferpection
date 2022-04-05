import React from "react";

type CheckButtonProps = {
  onClick?: (event: React.MouseEvent) => void;
  label: String;
  className: String;
};

const CheckButton: React.FC<CheckButtonProps> = ({
  onClick,
  label,
  className,
}) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      <input type="checkbox" />
      {label}
    </div>
  );
};

export default CheckButton;
