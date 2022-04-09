import React from "react";
import styles from "../../styles/Home.module.css";
import Button from "../Button";
import Product from "../../types";
import ChecklistItem from "../ChecklistItem";

function Checklist() {
  // pick checklist items from localStorage
  const [checklistItems, setChecklistItems] = React.useState<Product[]>();

  // clear checklist items from localStorage
  const resetChecklist = () => {
    localStorage.setItem("checklist", []);
    setChecklistItems([]);
  };

  // useEffect to save checklist items to localStorage
  React.useEffect(() => {
    const products: Product[] = JSON.parse(
      localStorage.getItem("checklist") || "[]"
    );
    setChecklistItems(products);
  }, []);

  return (
    <>
      <div className={styles.checklistHeading}>
        <div className={styles.checklistTitle}>Items checklist ({checklistItems?.length})</div>
        <Button
          label="Reset"
          className={styles.checklistResetButton}
          onClick={() => resetChecklist()}
        />
      </div>
      <div className={styles.ChecklistContainer}>
        {(checklistItems?.length > 0) ? (
          checklistItems?.map((item, index) => (
            <ChecklistItem
              key={index}
              product={item}
            />
          ))
        ) : (
          <p>No items in checklist</p>
        )}
      </div>
    </>
  );
}

export default Checklist;
