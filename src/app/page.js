import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
				<h1>QR Attendee Tracker</h1>
        <ol>
          <li>
						Make sure you have everything set up as in the <a href="https://github.com/scanapp-org/html5-qrcode-react" target="_blank">repository readme</a>.
          </li>
          <li>Make sure you have everything set up as described in the repository's README.</li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/scan/"
            rel="noopener noreferrer"
          >
            Scan QR
          </a>
        </div>
      </main>
    </div>
  );
}
