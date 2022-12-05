import Head from 'next/head'
import Gists from '../components/Gists'
import styles from '../styles/Home.module.css'
import { useState, useRef, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Search from '../components/Search'

const Home = () => {
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

        <Search ref={inputRef} handleClick={handleClick} />
        {username && <Gists username={username} />}
      </main>
      <Toaster position='top-center' />
    </div>
  )
}

Home.whyDidYouRender = true

export default Home
