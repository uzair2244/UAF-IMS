import React, { useState } from 'react';
import axios from "axios"
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  Typography,
  message
} from 'antd';
import { addTotalProducts } from '../features/dashboardSlice';
import { useDispatch } from 'react-redux';

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};


const AddProduct = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const [productData, setProductData] = useState({
    name: "",
    units: "",
    price: "",
    market: ""
  })
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const headers = { "Authorization": `Bearer ${token}` }
    const result = await axios.post("http://localhost:3000/api/v1/products", productData, { headers })

    if (result.data.message === "Product inserted successfully!") {
      dispatch(addTotalProducts())
      messageApi.open({
        type: 'success',
        content: 'Product Added Successfully',
      })
    } else {
      message.open({
        type: 'error',
        content: 'Something went wrong',
      })
    }
  }

  return (
    <div className='py-3 flex flex-col justify-center items-center '>
      {contextHolder}
      <Typography.Title level={3} style={{ marginLeft: "-10vh" }}>Add Inventory</Typography.Title>
      <div className={"w-1/2"}>
        <Form
          {...formItemLayout}
          variant="outlined"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Product Name"
            name="prod_name"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input value={productData.name} onChange={(e) => { setProductData({ ...productData, name: e.target.value }) }} />
          </Form.Item>

          <Form.Item
            label="Units to Buy"
            name="prod_units"
            rules={[
              {
                required: true,
                message: 'Please input how many units you buy!',
              },
            ]}
          >
            <InputNumber
              style={{
                width: '100%',
              }}
              max={100}
              min={1}
              onChange={(e) => { setProductData({ ...productData, units: e }) }}
            />
          </Form.Item>

          <Form.Item
            label="Price Per Unit"
            name="prod_Price"
            rules={[
              {
                required: true,
                message: 'Please input Price Per Unit!',
              },
            ]}
          >
            <Input value={productData.price} onChange={e => setProductData({ ...productData, price: e.target.value })} />
          </Form.Item>

          <Form.Item
            label="Market Place"
            name="prod_Market"
            rules={[
              {
                required: true,
                message: 'Please input name of market place!',
              },
            ]}
          >
            <Input value={productData.market} onChange={e => setProductData({ ...productData, market: e.target.value })} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default AddProduct;