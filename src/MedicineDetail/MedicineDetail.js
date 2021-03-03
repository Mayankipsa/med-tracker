import React, { Component } from "react";
import "./MedicineDetail.css";
import axios from "axios";

class MedicineDetail extends Component {
    state = {
        loadedMed: null
    }
    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedMed ||
                (this.state.loadedMed && this.state.loadedMed.id !== this.props.id)) {
                axios.get("http://localhost:5000/medicines/id/" + this.props.id)
                    .then(
                        response => {
                            this.setState({
                                loadedMed: response.data
                            });
                            //console.log(response);
                        }
                    );
            }
        }

    }

    render() {
        let med = <p style={{ textAlign: "center" }}>
            Please select a medicine!</p>;
        if (this.props.id) {
            med = <p style={{ textAlign: "center" }}>Loading...</p>
        }

        if (this.state.loadedMed) {
            med = (<div id="medicineDetail">
                <p><b>ID:</b> {this.state.loadedMed.id}</p>
                <p><b>Full Name:</b> {this.state.loadedMed.name}</p>
                <p><b>Brand:</b> {this.state.loadedMed.brand}</p>
                <p><b>Price:</b> {this.state.loadedMed.price}</p>
                <p><b>Quantity:</b> {this.state.loadedMed.quantity}</p>
                <p><b>xpiry Date:</b>{this.state.loadedMed.expiryDate}</p>
                <p><b>Notes:</b> {this.state.loadedMed.notes}</p>
            </div>);
        }
        return med;
    }

}

export default MedicineDetail;