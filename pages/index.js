import Head from "next/head";
import Featured from "../component/Featured";
import PizzaList from "../component/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Resturant</title>
        <meta name="description" content="Best pizza shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {/* 916163 */}
        

      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
    },
  };
};
