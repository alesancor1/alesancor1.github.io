import React, {CSSProperties, FunctionComponent} from "react";

interface AvatarProps {
  alt: string;
  style?: CSSProperties;
}

/**
 * Placeholder component which shows your avatar.
 */
const Avatar: FunctionComponent<AvatarProps> = ({alt, style}) => {
  return <img alt="alesancor1" style={{maxWidth: "55px", borderRadius: "100%", marginRight: 20, float: "left"}} src="https://avatars.githubusercontent.com/alesancor1" />;
};

export default Avatar;