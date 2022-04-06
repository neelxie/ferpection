import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import ProductListing from "./products";
import { GetServerSideProps } from "next";
import Checklist from "../components/Checklist";

type Product = {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
};

type Material = {
  productID: number;
  count: number;
};

interface Props {
  products: Product | Product[];
}

const Home: NextPage<Props> = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <div className={styles.Heading}>Store</div>
        <div className={styles.productList}>
          <ProductListing products={products} />
        </div>
      </div>
      <div className={styles.checklist}>
        <Checklist />
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch("http://localhost:3000/api/products");
  const products: Product = await response.json();
  if (!products) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      products,
    },
  };
};
