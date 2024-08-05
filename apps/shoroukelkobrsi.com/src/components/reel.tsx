import { css } from "../../styled-system/css";

// Styles
const reelStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "[calc(var(--menu-height) * -1)]",
  background: "var(--gray-12)",
  width: "full",
  height: "[100dvh]",
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
