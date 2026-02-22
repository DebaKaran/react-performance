import React, { useState } from 'react'

const VirtulizedList = ({ list, height, width, itemHeight }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const totalHeight = list.length * itemHeight;

    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(height / itemHeight);
    const endIndex = visibleCount + startIndex;


    const visibleList = list.slice(startIndex, endIndex);

    const handleScroll = (e) => {
        setScrollTop(e.target.scrollTop);
    }

    return (
        <div className='container' style={{ width, height, background: "grey", overflow: "auto" }}
            onScroll={handleScroll}>
            <div style={{ height: totalHeight, position: "relative" }}>
                <div style={{
                    transform: `translateY(${startIndex * itemHeight}px)`,
                    position: "absolute",
                    width: "100%"
                }}>
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
            </div>

        </div>
    )
}

export default VirtulizedList