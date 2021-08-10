import React from "react";
import "./CustomDropDown.css";

const CustomDropDown = (props) => {
  return (
    <div className="custom-dropdown">
      <label htmlFor="dropdown">{props.label}</label>
      <select
        id="dropdown"
        onChange={props.onChange}
        value={props.value}
        onBlur={props.onBlur}
      >
        <option key="0" value="0">
          Select
        </option>
        {props.list.map((item, key) => {
          console.log(typeof item);
          if (typeof item == "object") {
            return (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            );
          }
          if (typeof item == "string") {
            return (
              <option key={key} value={item}>
                {item}
              </option>
            );
          }
          return [];
        })}
      </select>
    </div>
  );
};

export default CustomDropDown;
