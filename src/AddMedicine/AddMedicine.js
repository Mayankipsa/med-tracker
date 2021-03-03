import React, { Component } from "react";
import "./AddMedicine.css";
import axios from "axios";

class AddMedicine extends Component {
    state = {
        loadedMed: null,
        id: null,
        name: null
    }

    onTodoChange(value) {
        console.log("Text Changed", value);
        this.setState({
            id: value
        });
    }

    postDataHandler = () => {
        const med = this.state.loadedMed;
        axios.post("http://localhost:5000/medicines", med).
            then(response => {
                console.log(response);
            });
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
            med = (<div id="addMedicine">
                <p>
                    <div className="inline"><b>ID:</b></div>
                    <div className="inline">
                        <input type="text"
                            value={this.state.loadedMed.id}
                        />
                    </div>
                </p>
                <p>
                    <div className="inline"><b>Full Name:</b> </div>
                    <div className="inline">
                        <input type="text"
                            value={this.state.loadedMed.name} />
                    </div>
                </p>
                <p>
                    <div className="inline"><b>Brand:</b></div>
                    <div className="inline"><input type="text" value={this.state.loadedMed.brand} /></div>
                </p>
                <p>
                    <div className="inline"><b>Price:</b></div>
                    <div className="inline"><input type="text" value={this.state.loadedMed.price} /></div>
                </p>
                <p>
                    <div className="inline"><b>Quantity:</b> </div>
                    <div className="inline"><input type="text" value={this.state.loadedMed.quantity} /></div></p>
                <p>
                    <div className="inline"><b>Expiry Date:</b></div>
                    <div className="inline"><input type="text" value={this.state.loadedMed.expiryDate} /></div></p>
                <p>
                    <div className="inline"><b>Notes:</b></div>
                    <div className="inline"><input type="text" value={this.state.loadedMed.notes} /></div>
                </p>
                <div><button onClick={this.postDataHandler}>Add Medicine</button></div>
            </div>);
        }
        return med;
    }

}

export default AddMedicine;