import { css } from "../../styled-system/css";

export default function Reel(): React.ReactElement {
  return (
    <div
      className={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "calc(var(--menu-height) * -1)",
        background: "var(--gray-12)",
        width: "100%",
        height: "100dvh",
      })}
    >
      <div
        className={css({
          animation: "gradientAnimation 10s ease infinite",
          background:
            "linear-gradient(to bottom, var(--gray-10), var(--gray-2))",
          backgroundSize: "100% 200%",
          aspectRatio: "var(--ratio-widescreen)",
          maxWidth: "100%",
          height: "100%",
        })}
      />
    </div>
  );
}
