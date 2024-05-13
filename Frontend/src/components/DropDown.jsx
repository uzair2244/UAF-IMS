import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';

const items = [
    {
        key: '0',
        label: 'admin',
    },
    {
        key: '1',
        label: 'management',
    },
    {
        key: '2',
        label: 'user',
    },
];

const DropDown = ({ data, handleData }) => {
    const [dropTitle, setDropTitle] = useState('select')

    function handleClick(e) {
        handleData({ ...data, role: items[e.key].label })
        console.log(data)
        setDropTitle(items[e.key].label)
    }


    return (
        < Dropdown
            menu={{
                items,
                selectable: true,
                defaultSelectedKeys: ['1'],
                onClick: (e) => handleClick(e)
            }
            }
        >
            <Typography.Link>
                <Space style={{ color: "black" }}>
                    {dropTitle}
                    <DownOutlined />
                </Space>
            </Typography.Link>
        </Dropdown >
    )
};
export default DropDown;