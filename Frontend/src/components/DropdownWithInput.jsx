import React from 'react';
import { Select } from 'antd';


const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



const DropdownWithInput = ({ data, key, name, handleFormData, formData }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
    console.log(formData)
    if (name === 'workers') {
      handleFormData({ ...formData, user: value })
    }
    if (name === 'items') {
      handleFormData({ ...formData, item: value })
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
        return ({ value: val.name, label: val.name, key: i })
      })}
    />
  )

};
export default DropdownWithInput;