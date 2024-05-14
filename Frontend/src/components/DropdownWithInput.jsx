import React, { useState } from 'react';
import { Select } from 'antd';


const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());




const DropdownWithInput = ({ data, key, name, handleFormData, formData, handleTotalItem }) => {


  const onChange = (value, i) => {
    console.log(`selected ${value}`);
    console.log(formData)
    if (name === 'workers') {
      handleFormData({ ...formData, user: value })
    }
    if (name === 'items') {
      handleFormData({ ...formData, item: value })
      handleTotalItem(i.units)
    }
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={data.map((val, i) => {
        return ({ value: val.name, label: val.name, key: i, units: val.units })
      })}
    />
  )

};
export default DropdownWithInput;