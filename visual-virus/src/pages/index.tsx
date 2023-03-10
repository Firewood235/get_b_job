import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Visual Virus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            You can learn some Web Security here.
          </h1>
          <h1 className={styles.title}>
            ここでは、インターネットの危険を学ぶことができます。
          </h1>
        </header>

        <body className={styles.body}>
          <h2>体験したい項目を選択してください。</h2>
          <div className={styles.riskContainer}>
            <div className={styles.risks}>
              <Link href="/xss/login">
                <div className={styles.risk}>
                  <div className={styles.risk__name}>XSS (Cross-site Scripting)</div>
                  <div className={styles.risk__mark}>X</div>
                </div>
              </Link>
              <Link href="/injection">
                <div className={styles.risk}>
                  <div className={styles.risk__name}>SQL injection</div>
                  <div className={styles.risk__mark}>💉</div>{/*← 変更するよー*/}
                </div>
              </Link>
            </div>
          </div>
        </body>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
