import React, { useState } from 'react'

const VirtulizedList = ({ list, height, width, itemHeight }) => {
    const endIndex = Math.floor(height / itemHeight);
    const startIndex = 0;

    //const [indicies, setIndicies] = useState([startIndex, endIndex]);
    const visibleList = list.slice(startIndex, endIndex + 1);
    return (
        <div className='container' style={{ width, height, background: "grey", overflow: "hidden" }}>
            {visibleList.map((item) => (
                <div className='item' key={item} style={{
                    height: itemHeight,
                    background: "coral",
                    borderTop: "5px solid grey"
                }}>
                    {
                        "Item: " + item
                    }
                </div>
            ))}
        </div>
    )
}

export default VirtulizedList