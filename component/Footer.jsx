import Image from "next/image";
import styles from "../styles/Footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE FOODY FOOD, WE COOK LOVE.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTURANT</h1>
          <p className={styles.text}>
            123, Ring Road #304.
            <br /> New Delhi, 886876
            <br /> (+91) 7354268161
          </p>
          <p className={styles.text}>
            123, Ring Road #304.
            <br /> New Delhi, 886876
            <br /> (+91) 7354268161
          </p>
          <p className={styles.text}>
            123, Ring Road #304.
            <br /> New Delhi, 886876
            <br /> (+91) 7354268161
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
