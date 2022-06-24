import Avatar from "react-avatar";
import { avatarColors } from "../../../../constants/constants";
import "./profileThumb.less";

const ProfileIcon = (props: any) => {
  const { src, name, size, className } = props;
  const color = avatarColors[Math.floor(Math.random() * avatarColors.length)];
  return src ? (
    <Avatar
      // className="profileThumb"
      className={className ? `profileThumb ${className}` : "profileThumb"}
      src={src}
      // size={size == "large" ? "100" : "48"}
      size={size}
      round={true}
    />
  ) : (
    <Avatar
      // className="profileThumb"
      style={{fontSize:"14px !important"}}
      className={className ? `profileThumb ${className}` : "profileThumb"}
      name={name}
      size={size}
      round={true}
      color={color}
    />
  );
};
export default ProfileIcon;
