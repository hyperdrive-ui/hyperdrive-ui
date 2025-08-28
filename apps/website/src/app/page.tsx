// import Image from "next/image";
// import styles from "./page.module.css";

import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Welcome</h1>
      <p>Head to the <Link href="/docs">Docs</Link> to get started.</p>
    </main>
  );
}
