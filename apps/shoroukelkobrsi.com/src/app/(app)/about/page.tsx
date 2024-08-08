import styles from "./about.module.css";

export default function AboutPage(): React.ReactElement {
  return (
    <div className={styles.aboutPage}>
      <h1>About Shorouk Elkobrsi</h1>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
          mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
          neque eu tellus rhoncus ut eleifend nibh porttitor.
        </p>
        <p>
          Ut in nulla enim. Phasellus molestie magna non est bibendum non
          venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
          Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
          odio.
        </p>
        <p>
          Proin quis tortor orci. Etiam at risus et justo dignissim congue.
          Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc
          eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus
          eget in metus. In pellentesque faucibus vestibulum.
        </p>
      </div>
    </div>
  );
}
