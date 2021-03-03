import React, { Component } from "react";
import './App.css';
import Medicine from "./Medicine/Medicine";
import MedicineDetail from "./MedicineDetail/MedicineDetail";
import Search from "./Search/Search";
import axios from "axios";
import AddMedicine from "./AddMedicine/AddMedicine";

class App extends Component {
  state = {
    medicines: [],
    selectedMedicineId: null,
    searchText: null
  }
  componentDidMount() {
    axios.get("http://localhost:5000/medicines")
      .then(response => {
        this.setState({ medicines: response.data });
      }
      );
  }

  medicineSelectedHandler = (id) => {
    this.setState({
      selectedMedicineId: id
    });
  }

  searchHandler = (event) => {
    const searchText = event.target.value;
    this.setState(
      {
        searchText: searchText
      }
    );
    axios.get("http://localhost:5000/medicines/name/" + searchText)
      .then(response => {
        this.setState({ medicines: response.data });
      }
      );
  }

  render() {
    const green = {
      color: 'green'
    };


    let meds = <p>No Data Found</p>;
    // console.log("Meds:", this.state.medicines);
    if (this.state.medicines.length > 0) {
      meds = this.state.medicines.map(med => {
        return <Medicine
          key={med.id}
          medName={med.name}
          price={med.price}
          med={med}
          clicked={() => this.medicineSelectedHandler(med.id)} />
      });

    }

    return (
      <div className="App">
        <h1>Available Medicines</h1>
        <div>
          {/* <Search
            textChanged={() => this.searchHandler(this.state.searchText)}
          /> */}
          <div style={{ display: "inline-block", margin: "10px" }}><b>Search medicine By Name:</b></div>
          <div style={{ display: "inline-block", margin: "10px" }}>
            <b> <input
              type="text"
              onChange={this.searchHandler}
              value={this.state.searchText}></input></b></div>

        </div>

        <div >{meds}</div>
        <hr></hr>
        <div style={{ display: "inline-block" }}>
          <h2 style={green}>Selected Medicine</h2>
          <MedicineDetail
            id={this.state.selectedMedicineId}
          />
        </div>
        <div style={{ display: "inline-block" }}>
        <h2 style={green}>Add Medicine</h2>
          <AddMedicine 
          id={this.state.selectedMedicineId}/>
        </div>

      </div >
    );
  }
}

export default App;
