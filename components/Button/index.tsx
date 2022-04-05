import React from "react";

function Button(props: any) {
  const { label, className, onClick } = props;
  return (
    <button className={`${className}`} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button