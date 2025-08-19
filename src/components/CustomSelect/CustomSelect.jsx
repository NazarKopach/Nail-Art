import { useField } from "formik";
import { useState } from "react";
import styles from "./CustomSelector.module.css";

const CustomSelect = ({ label, options, selectOption, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.custom_selector_wrapper}>
      <label className={styles.custom_select_label}>{label}</label>
      <div className={styles.custom_select_div} onClick={() => setOpen(!open)}>
        {field.value || selectOption}
      </div>
      {open && (
        <ul className={styles.custom_select_list}>
          {options.map((option) => (
            <li
              className={styles.custom_select_item}
              key={option.id}
              onClick={() => {
                helpers.setValue(option.value);
                setOpen(false);
              }}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
      {meta.touched && meta.error ? (
        <div className={styles.custom_select_error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
