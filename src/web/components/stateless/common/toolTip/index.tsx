import { Tooltip } from "antd";
import { Children } from "react";
import "./toolTip.less";

const CustomTooltip = (props: any) => {
  const { content, title, color, overlayClassName, children , placement} = props;
  return (
    <>
          <Tooltip
            title={title}
            color={color}
            placement={placement}
            overlayClassName={
              overlayClassName ? `tb-0 ${overlayClassName}` : "tb-0"
            }
          >
            {children}
          </Tooltip>
    </>
  );
};

export default CustomTooltip;
