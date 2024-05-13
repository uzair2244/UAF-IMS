import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const DropdownWithInput = ({ data }) => {
  const [searchValue, setSearchValue] = useState('');
  console.log(data)
  const options = [{
    value: 'Uzair'
  },
  { value: 'zubair' }];

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <AutoComplete
      options={filteredOptions}
      style={{ width: 200 }}
      placeholder="Start writing here or click"
      onChange={(value) => setSearchValue(value)}
      value={searchValue}
    />
  );
};

export default DropdownWithInput;