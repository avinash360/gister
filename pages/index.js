import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [username, setUsername] = useState('')
  const inputRef = useRef(null)

  const handleClick = () => setUsername(inputRef.current.value)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Gister - Get your gists</title>
        <meta name="description" content="get your github gists" />
        <link rel="icon" href="/images/gister_logo_small.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Gister</h1>
        <h3 className={styles.description}>Get started by adding a Github username.</h3>

        <div className={styles.searchContainer}>
          <input ref={inputRef} className={styles.usernameBox} type="text" placeholder="Github Username" />
          <button onClick={handleClick} className={styles.fetchButton}>Fetch!</button>
        </div>
      </main>
    </div>
  )
}
