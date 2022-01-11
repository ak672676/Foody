import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Resturant</title>
        <meta name="description" content="Best pizza shop"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src="/img/pizza.png" alt="pizza" width={400} height={400} />
      Homepage
    </div>
  )
}
