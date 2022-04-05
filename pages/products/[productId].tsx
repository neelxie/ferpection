import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Button from "../../components/Button";

const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const [count, setCount] = useState(product.quantity);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    setProduct(products.find((product) => product.id == productId));
  }, [productId]);

  useEffect(() => {
    setCount(product.quantity);
  }, [product]);

  // Create handleIncrement event handler
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  //Create handleDecrement event handler
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.ProductContainer}>
        <div className={styles.ProductHeading}>
          <Link href="/">Products /</Link>
          <div className={styles.ProductName}>{product.name}</div>
        </div>
        <div className={styles.ProductItem}>
          <img
            src={product.imageURL}
            className={styles.ProductImage}
            alt={product.name}
          />

          <div className={styles.ProductDetails}>
            <div className={styles.ProductQuantity}>Quantity</div>
            <div className={styles.ProductForm}>
              <div className={styles.ProductFormQuantity}>
                <div onClick={handleDecrement}>
                  <img
                    src={
                      require("../../components/assets/circle-minus.svg")
                        .default.src
                    }
                    alt="An SVG of a minus"
                    className={styles.Icons}
                  />
                </div>
                <div className={styles.Quantity}>{count}</div>
                <div onClick={handleIncrement}>
                  <img
                    src={
                      require("../../components/assets/plus-svg.svg").default
                        .src
                    }
                    alt="An SVG of a minus"
                    className={styles.Icons}
                  />
                </div>
              </div>
              <div className={styles.ProductFormButton}>
                <Button label="Update" className={styles.button} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.checklist}></div>
    </div>
  );
};

export default ProductDetail;
