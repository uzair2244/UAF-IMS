import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Select, message } from 'antd';
import axios from 'axios';

const headers = { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2E2M2M4NDM2NmY0Y2Y3M2JmNjA0MCIsImlhdCI6MTcxNTEwMzkzNCwiZXhwIjoxNzE1MTkwMzM0fQ.FmWb7u9FbJQMxpCclcmb-CsScrICXc0_dJEVRtdUzeA" }


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode
  {
    inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const EditUser = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const [messageApi, contextHolder] = message.useMessage()

  async function updateRow(row) {
    const result = await axios.put(`http://localhost:3000/api/v1/products/${row._id}`, row, { headers })
    if (result.status === 200) {
      messageApi.open({
        type: 'success',
        content: 'Update Successfully',
      })
    } else {
      messageApi.open({
        type: 'error',
        content: 'Update Failed',
      })
    }
  }

  async function deleteRow(row) {
    const result = await axios.delete(`http://localhost:3000/api/v1/user/delete/${row._id}`, { headers })
    if (result.status === 200) {
      messageApi.open({
        type: "success",
        content: "Delete Successfully"
      })
    } else {
      messageApi.open({
        type: "error",
        content: "Delete Failed"
      })
    }
  }

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user", { headers })
      .then((result) => {
        const newData = result.data.users.map((user, index) => {
          return {
            ...user,
            key: `${index}`,
          };
        });
        setData(newData)
      })
  }, [])



  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        updateRow({ ...item, ...row })
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    deleteRow(data[key])
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleAuthorityChange = (value, record) => {
    const newData = [...data];
    const index = newData.findIndex((item) => record.key === item.key);
    if (index > -1) {
      const item = newData[index];
      updateRow({ ...item, authority: value })
      newData.splice(index, 1, {
        ...item,
        authority: value,
      });
      setData(newData);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Password',
      dataIndex: 'password',
      width: '25%',
      editable: true,
    },
    {
      title: 'Authority',
      dataIndex: 'authority',
      width: '25%',
      editable: true,
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              <Select
                mode="multiple"
                value={text}
                onChange={(value) => handleAuthorityChange(value, record)}
                className='w-full'
              >
                <Select.Option value="addProduct">Add Product</Select.Option>
                <Select.Option value="addUser">Add User</Select.Option>
                <Select.Option value="editProduct">Edit Product</Select.Option>
                <Select.Option value="editUser">Edit User</Select.Option>
                <Select.Option value="tasks">Tasks</Select.Option>
              </Select>
            </Form.Item>
          );
        } else {
          return text;
        }
      },
    },
    {
      title: 'Edit',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: 'Delete',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      {contextHolder}
      <div className='flex justify-center'>
        <Typography.Title level={4}>Edit Users</Typography.Title>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 5
          }}
        />
      </Form>
    </div>
  );
};
export default EditUser;