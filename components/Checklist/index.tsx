import React from "react";
import styles from "../../styles/Home.module.css";
import Button from "../Button";

function Checklist() {
  // pick checklist items from localStorage
  const [checklistItems, setChecklistItems] = React.useState("[]");

  // clear checklist items from localStorage
  const resetChecklist = () => {
    localStorage.setItem("checklistItems", "[]");
    setChecklistItems("[]");
  };

  // useEffect to save checklist items to localStorage
  React.useEffect(() => {
    localStorage.setItem("checklistItems", JSON.stringify(checklistItems));
  }, [checklistItems]);

  // map checklist array function
  const mapChecklist = (checklist) => {
    if (checklist.length > 0) {
      return checklist.map((item, index) => {
        <div className={styles.checklistItem} key={index}>
          <div className={styles.checklistItemText}>{item.name}</div>
          <div className={styles.checklistItemQuantity}>{item.quantity}</div>
        </div>;
      });
    } else {
      return <p>No items in checklist</p>;
    }
  };

  return (
    <>
      <div className={styles.checklistHeading}>
        <div className={styles.checklistTitle}>Items checklist</div>
        <Button
          label="Reset"
          className={styles.checklistResetButton}
          onClick={() => resetChecklist()}
        />
      </div>
      <div>{mapChecklist}</div>
    </>
  );
}

export default Checklist;
