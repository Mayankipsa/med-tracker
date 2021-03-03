import React from "react";
import "./Search.css";

const search = (props) => {
    return (
        <div id="search" >
            <div style={{ display: "inline-block", margin: "10px" }}><b>Search medicine By Name:</b></div>
            <div style={{ display: "inline-block" }}><input type="text" onChange={props.textChanged}></input></div>
        </div>
    );
}

export default search;