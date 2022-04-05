import React from "react";

type ButtonProps = {
  onClick?: (event: React.MouseEvent) => void;
  label: String;
  className: String;
};

const Button: React.FC<ButtonProps> = ({ label, className, onClick }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
