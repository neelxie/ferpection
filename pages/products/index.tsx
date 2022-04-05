import { useEffect, useState } from "react";
import React, { FC } from "react";
import ProductItem from "./ProductItem";
import styles from "../../styles/Home.module.css";

type Material = {
  productID: number;
  count: number;
};

type Product = {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
};

interface ProductListingProps {
  products: Product;
}

function addQuantity(productArray: ProductListingProps[]) {
  // since quantity is not given, I want max quantity to be 10
  // and minimum to be 2. Then randomly add them to the product items
  for (let product of productArray) {
    let quantity: Number = Math.floor(Math.random() * 10) + 2 + 1;
    Object.assign(product, { quantity: quantity });
  }
  return productArray;
}

const ProductListing: FC<ProductListingProps> = ({ products }) => {
  const [stateProducts, setStateProducts] = useState([]);
  console.log(stateProducts);

  useEffect(() => {
    let savedProducts: [];
    savedProducts = JSON.parse(localStorage.getItem("products") || "[]");

    if (savedProducts.length < 1) {
      const newProductArray = addQuantity(products);
      localStorage.setItem("products", JSON.stringify(newProductArray));
      savedProducts = JSON.parse(localStorage.getItem("products") || "[]");
      
      setStateProducts(savedProducts);
    } else {
      setStateProducts(savedProducts);
    }
  }, [products]);

  return (
    <div className={styles.ProductsContainer} id="products">
      {stateProducts.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductListing;
