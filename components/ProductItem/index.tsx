import type { NextPage } from "next";
import Button from "../../components/Button";
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
      <div className={styles.ProductImageDiv}>
        <Button
          label={product.materials.length > 0 ? "Craftable" : "Uncraftable"}
          className={
            product.materials.length > 0
              ? `${styles.CraftableButton}`
              : `${styles.UnCraftableButton}`
          }
        />
        <img
          className={styles.ProductImage}
          src={product.imageURL}
          alt={product.name}
        />
      </div>
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
