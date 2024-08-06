import { css } from "../../styled-system/css";

const menuStyles = css({
  display: "flex",
  position: "sticky",
  top: "0",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: "2",
  background:
    "[linear-gradient(to bottom, rgba(50, 50, 50, 0.4), rgba(0, 0, 0, 0))]",
  width: "full",
  height: "menuHeight",
  color: "neutral.100",
  paddingX: {
    base: "4",
    sm: "12",
  },
});

const menuChildrenStyles = css({
  fontSize: "lg",
  fontFamily: "fontPrimary",
});

const menuTitleStyles = css({
  fontSize: "xl",
  fontFamily: "fontPrimary",
});

export default function Menu(): React.ReactElement {
  return (
    <header className={menuStyles}>
      <div className={menuChildrenStyles}>Logo</div>
      <div className={menuTitleStyles}>The cinema of Shorouk Elkorsi.</div>
      <div className={menuChildrenStyles}>Menu</div>
    </header>
  );
}
