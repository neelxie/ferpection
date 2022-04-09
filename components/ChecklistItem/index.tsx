// component for check list item
import React from "react";
import styles from "../../styles/Home.module.css";
import Product from "../../types";

function ChecklistItem(product) {
  return (
    <div key={product.product.id} className={styles.ThumbnailContainer}>
      <img
        src={product.product.imageURL}
        className={styles.ChecklistThumbnail}
        alt={product.product.name}
      />
      <div className={styles.ChecklistDetails}>
        <div>{product.product.name}</div>
        <div>x{product.product.quantity}</div>
      </div>
    </div>
  );
}

export default ChecklistItem;
