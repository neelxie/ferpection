import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Button from "../../components/Button";

const ProductDetail = () => {
  const [product, setProduct] = useState("");
  const [count, setCount] = useState(product?.quantity || 0);
  const [allProducts, setAllProducts] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    setProduct(products.find((product) => product.id == productId));
    setAllProducts(products);
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

  const listOfMaterials = (product) => {
    let materials = [];
    if (product.materials?.length > 0) {
      for (let material of product.materials) {
        materials.push(
          <div key={material.productID} className={styles.MaterialContainer}>
            <img
              src={getProductImage(allProducts, material.productID)}
              className={styles.ThumbnailImage}
              alt={product.name}
            />
            <div className={styles.ThumbnailDetails}>
              <div>{getProductName(allProducts, material.productID)}</div>
              <div>x{material.count}</div>
            </div>
          </div>
        );
      }
    }
    return materials;
  };

  function craftProduct() {
    // check if the user has enough materials to craft the product
    // if yes, craft the product
    // if no, alert the user that they don't have enough materials
    if (product.materials.length > 0) {
      for (let material of product.materials) {
        let materialCount = getMaterialCount(allProducts, material.productID);
        if (materialCount < material.count) {
          alert("You don't have enough materials to craft this product");
          return;
        } else {
          // subtract the material count from the user's inventory
          // add the product to the user's inventory
          // subtract the product's cost from the material's product quantity
          // alert the user that they have crafted the product
          let newMaterialCount = materialCount - material.count;
          let newQuantityProductCount = getProductCount(allProducts, material.productID);
          let newQuantityProduct = {
            ...getProduct(allProducts, material.productID),
          };
          newQuantityProduct.quantity = newQuantityProductCount - material.count;
          let newProduct = { ...product };
          newProduct.quantity += 1;
          setProduct(newProduct);
          let modifiedProductsArray = mergeArrayModifiedProduct(allProducts, newQuantityProduct);
          modifiedProductsArray = mergeArrayModifiedProduct(modifiedProductsArray, newProduct);
          setAllProducts([...modifiedProductsArray]);
          localStorage.setItem("products", JSON.stringify(modifiedProductsArray));
        }
      }
    }
  }

  const mergeArrayModifiedProduct = (arr, modifiedProduct) => arr && arr.map(item => item.id === modifiedProduct.id ? modifiedProduct : item);

  function getProduct(allProducts, productId){
    // Get the product from the allProducts array
    // based on the productId
    return allProducts.find((product) => product.id == productId);
  }

  function getProductCount(products, productId) {
    // get the product count from the user's inventory
    let productCount = 0;
    for (let product of products) {
      if (product.id == productId) {
        productCount = product.quantity;
      }
    }
    return productCount;
  }

  function getMaterialCount(allProducts, productId) {
    return allProducts?.find((product) => product.id === productId).quantity;
  }
  function getProductName(allProducts, productId) {
    return allProducts?.find((product) => product.id === productId).name;
  }

  function getProductImage(allProducts, productId) {
    return allProducts?.find((product) => product.id === productId).imageURL;
  }
  const productMaterials = listOfMaterials(product);

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

          <div className={styles.ProductDetailDiv}>
            <div className={styles.FlexContainer}>
              <div>
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
                          require("../../components/assets/plus-svg.svg")
                            .default.src
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
              <div className={styles.CraftStatusButtonDiv}>
                <Button
                  label={
                    product?.materials?.length > 0 ? "Craftable" : "Uncraftable"
                  }
                  className={
                    product?.materials?.length > 0
                      ? `${styles.CraftStatusButton}`
                      : `${styles.UnCraftableStatusButton}`
                  }
                />
              </div>
            </div>
            <div className={styles.MaterialsGrid}>
              <div>Needed to Craft</div>
              <div className={styles.MaterialsContainer}>
                {productMaterials.length > 0 ? (
                  productMaterials
                ) : (
                  <div>No materials needed to craft this item</div>
                )}
              </div>
            </div>
            <div className={styles.CraftButton}>
              <Button
                label="Craft"
                onClick={craftProduct}
                className={styles.ProductDetailSubmitButton}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.checklist}></div>
    </div>
  );
};

export default ProductDetail;
