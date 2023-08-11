import React from "react";

const Dropdown = () => {
  return (
    <div>
      <h3 className="mb-2">Chuyên mục</h3>
      <select data-te-select-init className="w-full bg-blue-50 py-2 px-2 border-none">
        <option value="1">One</option>
      </select>
    </div>
  );
};

export default Dropdown;
