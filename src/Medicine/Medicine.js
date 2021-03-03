import React, { Component } from "react";
import "./Medicine.css";

class Medicine extends Component {

    render() {
        var todaysDate = new Date();
        var dateMonthLater = new Date(); // Now
        dateMonthLater.setDate(dateMonthLater.getDate() + 30); // Set now + 30 days as the new date

        var medExpiryDate = new Date(this.props.med.expiryDate);

        const bg = {
            backgroundColor: "white"
        };
        if (this.props.med.quantity < 10) {
            bg.backgroundColor = "yellow";
        }

        if (medExpiryDate < dateMonthLater) {
            bg.backgroundColor = "red";
        }

        return (
            <div id="medicine" onClick={this.props.clicked} style={bg} >
                <p><b>Full Name:</b> {this.props.medName}</p>
                <p>Price: {this.props.price}</p>
            </div>
        );
    }

}

export default Medicine;