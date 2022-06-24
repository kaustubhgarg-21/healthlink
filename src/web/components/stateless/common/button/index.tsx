import React from "react";
import "./button.less";

const Button = (props: any) => {
    const {type, onClick, disabled, children, className, form, htmlType}= props;
    return (
        <button
            type={htmlType}
            form={form}
            className={className ? `${type} ${className}`: type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}  
        </button>
    );
};
export default Button;



