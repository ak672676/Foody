import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Lorem ipsum.
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza) => {
          return <PizzaCard key={pizza.id} pizza={pizza} />;
        })}
        {/* <PizzaCard /> */}
      </div>
    </div>
  );
};

export default PizzaList;
