import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";

interface Material {
  productID: number;
  count: number;
}

interface Product {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
}

interface ProductItemProps {
  product: Product;
}

const ProductItem: NextPage<ProductItemProps> = ({ product }) => {
  return (
    <div className={styles.ProductCard}>
      <img
        className={styles.ProductImage}
        src={product.imageURL}
        alt={product.name}
      />
      <div className={styles.productDetails}>
        <div>{product.name}</div>
        <div className={styles.FlexContainer}>
          <div>{`${product.quantity}`}</div>
          <div className={styles.BlackText}>in Stock</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
