import { useEffect, useState } from "react";
import React, { FC } from "react";
import ProductItem from "../../components/ProductItem";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import CheckButton from "../../components/CheckButton";

interface Material{
  productID: number;
  count: number;
};

interface Product {
  name: string;
  id: number;
  imageURL: string;
  materials: Material[];
  Quantity?: number;
};

interface ProductListingProps {
  products: Product[];
}

function addQuantity(productArray: ProductListingProps[]) {
  // since quantity is not given, I want max quantity to be 9
  // and minimum to be 0. Then randomly add them to the product items
  for (let product of productArray) {
    let quantity: Number = Math.floor(Math.random() * 9) + 0 + 1;
    Object.assign(product, { quantity: quantity });
  }
  return productArray;
}

function mapArray(productArray: ProductListingProps[]) {
  return productArray.map((product) => (
    <Link href={"/products/" + product.id} key={product.id}>
      <a className={styles.single}>
        <ProductItem product={product} />
      </a>
    </Link>
  ));
}

const ProductListing: FC<ProductListingProps> = ({ products }) => {
  const [stateProducts, setStateProducts] = useState<Product[]>([]);
  const [owned, setOwned] = useState<boolean>(false);
  const [notOwned, setNotOwned] = useState<boolean>(false);
  const [craftable, setCraftable] = useState<boolean>(false);
  const [ownedArray, setOwnedArray] = useState<Product[]>([]);
  const [notOwnedArray, setNotOwnedArray] = useState<Product[]>([]);
  const [craftableArray, setCraftableArray] = useState<Product[]>([]);

  useEffect(() => {
    function filterByOwned() {
      let ownedProducts = stateProducts?.filter(
        (product) => product?.quantity !== 0
      );
      return ownedProducts;
    }

    function filterByNotOwned() {
      let notOwnedProducts = stateProducts?.filter(
        (product) => product?.quantity == 0
      );
      return notOwnedProducts;
    }

    function filterByCraftable() {
      let craftableProducts = stateProducts?.filter(
        (product) => product?.materials?.length > 0
      );
      return craftableProducts;
    }
    if (stateProducts.length > 1) {
      setCraftableArray(filterByCraftable());
      setNotOwnedArray(filterByNotOwned());
      setOwnedArray(filterByOwned());
    }
  }, [stateProducts]);

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

  let renderList = () => {
    if (owned) {
      return mapArray(ownedArray);
    } else if (notOwned) {
      return mapArray(notOwnedArray);
    } else if (craftable) {
      return mapArray(craftableArray);
    } else {
      return mapArray(stateProducts);
    }
  };

  return (
    <>
      <div className={styles.ProductsFilter}>
        <div className={styles.ProductsFilterContainer}>
          <div>Filter By:</div>
          <div className={styles.FilterButtons}>
            <CheckButton
              label="Owned"
              className={styles.CheckButton}
              onClick={() => setOwned((prevOwned) => !prevOwned)}
            />
            <CheckButton
              label="Not Owned"
              className={styles.CheckButton}
              onClick={() => setNotOwned((prevNotOwned) => !prevNotOwned)}
            />
            <CheckButton
              label="Craftable"
              className={styles.CheckButton}
              onClick={() => setCraftable((prevCraftable) => !prevCraftable)}
            />
          </div>
        </div>
      </div>
      <div className={styles.ProductsContainer} id="products">
        {renderList()}
      </div>
    </>
  );
};

export default ProductListing;
