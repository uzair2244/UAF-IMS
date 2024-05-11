import React from 'react'
import { Card} from 'antd';

const Cards = ({card_title, card_content}) => {
    return (
        <Card
            title= {card_title}
            bordered={false}
            style={{
                width: 300,
                backgroundColor: "#BAC1CC",
            }}
        >
            <p>{card_content}</p>
        </Card>
    )
}

export default Cards
