import React from "react";

export default function Box(props) {
  const { size = "medium", children, className, ...rest } = props;
  return (
    <div className={`box box-${size} ${className}`} {...rest}>
      {children}
    </div>
  );
}
