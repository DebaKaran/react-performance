import React, { useState } from 'react'

const VirtulizedList = ({ list, height, width, itemHeight }) => {
    const endIndex = Math.floor(height / itemHeight);
    const startIndex = 0;

    //const [indicies, setIndicies] = useState([startIndex, endIndex]);
    const visibleList = list.slice(startIndex, endIndex + 1);
    return (
        <div className='container'>
            {visibleList.map((item) => (
                <div className='item' key={item}>
                    {
                        "Item: " + item
                    }
                </div>
            ))}
        </div>
    )
}

export default VirtulizedList