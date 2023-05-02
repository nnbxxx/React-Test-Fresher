import { Select } from "antd";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};
const SelectCategory = (props) => {
  const { options } = props;
  return (
    <Select
      showSearch
      placeholder='Select a person'
      optionFilterProp='children'
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={options} //array
    />
  );
};
export default SelectCategory;
