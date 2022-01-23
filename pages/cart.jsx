import Image from "next/image";
import styles from "../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";

// import OrderDetail from "../components/OrderDetail";
const Cart = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const MONGODB_URL = process.env.CONTENTFUL_RAZOR_PAY_KEY_ID;
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
    //   t.json()
    // );

    const data = await axios.post(`http://localhost:3000/api/razorpay`);
    var options = {
      key: "rzp_test_ZWC26mb9Wqeu0Q", // Enter the Key ID generated from the Dashboard
      name: "Manu Arora Pvt Ltd",
      currency: data.data.currency,
      amount: data.data.amount,
      order_id: data.data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        createOrder({
          customer: "Amit",
          address: "Raxaul",
          total: cart.total,
          method: 1,
        });
      },
      prefill: {
        name: "Manu Arora",
        email: "manuarorawork@gmail.com",
        contact: "9999999999",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton}>CASH ON DEVIVERY</button>
              <button
                className={styles.button}
                onClick={() => {
                  // const options = {
                  //   key: "rzp_test_ZWC26mb9Wqeu0Q",
                  //   amount: "1000000", //  = INR 1
                  //   name: "Foody",
                  //   description: "Food that makes you smile",
                  //   image:
                  //     "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
                  //   handler: function (response) {
                  //     alert(response.razorpay_payment_id);
                  //   },
                  //   prefill: {
                  //     name: "Gaurav",
                  //     contact: "9999999999",
                  //     email: "demo@demo.com",
                  //   },
                  //   notes: {
                  //     address: "some address",
                  //   },
                  //   theme: {
                  //     color: "orange",
                  //     hide_topbar: false,
                  //   },
                  // };
                  // const paymentObject = new window.Razorpay(options);
                  // paymentObject.open();
                  makePayment();
                }}
              >
                PAY NOW
              </button>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
