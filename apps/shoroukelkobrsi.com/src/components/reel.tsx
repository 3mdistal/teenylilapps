import { css } from "../../styled-system/css";

// Styles
const reelStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "neutral.900",
  width: "full",
  height: "dvh",
});

const reelInnerStyle = css({
  animation: "[gradientAnimation 10s ease infinite]",
  background: "[linear-gradient(to bottom, var(--gray-10), var(--gray-2))]",
  backgroundSize: "100% 200%",
  aspectRatio: "var(--ratio-widescreen)",
  maxWidth: "full",
  height: "full",
});

export default function Reel(): React.ReactElement {
  return (
    <div className={reelStyle}>
      <div className={reelInnerStyle} />
    </div>
  );
}
