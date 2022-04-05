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
        className={styles.productImage}
        src={product.imageURL}
        alt={product.name}
      />
      <div className={styles.productDetails}>
        <div className={styles.productName}>{product.name}</div>
      </div>
    </div>
  );
};

export default ProductItem;
