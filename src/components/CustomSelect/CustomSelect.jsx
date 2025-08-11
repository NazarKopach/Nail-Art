import { useField } from "formik";
import { useState } from "react";
import styles from "./CustomSelector.module.css";

const CustomSelect = ({ label, options, selectOption, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.custom_selector_div}>
      <label>{label}</label>
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px",
          border: "1px solid #808080",
          borderRadius: "5px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {field.value || selectOption}
      </div>
      {open && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #808080",
            borderRadius: "5px",
            background: "white",
            zIndex: 1000,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                helpers.setValue(option);
                setOpen(false);
              }}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor:
                  field.value === option ? "#eee" : "transparent",
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {meta.touched && meta.error ? (
        <div style={{ color: "red", fontSize: "12px" }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
