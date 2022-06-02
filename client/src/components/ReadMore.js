import React, { useState } from "react";

const ReadMore = ({children}) => {
    const text = children;
    const [isTruncated, setIsTruncated] = useState(true);
  return (
    <div>
        <p style={{width: "450px"}}>
            {isTruncated ? text.slice(0, 50) + "..." : text}
            <button className="readmore_btn" onClick={() => setIsTruncated(!isTruncated)} >{isTruncated ? "Read More" : "Read Less"}</button>
        </p>
    </div>
  )
}

export default ReadMore;
