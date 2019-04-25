import React, { Component } from 'react';
import './App.css';
import firebase from "firebase";
import { Row, Col, Button, DatePicker } from 'antd';


var config = {
  apiKey: "AIzaSyCG05Ct8wivIDGgraU7Owi5-QT2l3kp5nc",
  authDomain: "see-the-sun.firebaseapp.com",
  databaseURL: "https://see-the-sun.firebaseio.com",
  projectId: "see-the-sun",
  storageBucket: "see-the-sun.appspot.com",
  messagingSenderId: "375121359200"
};
firebase.initializeApp(config);

class App extends Component {

  state = {
    longitude: "-78.9003",
    latitude: "37.9608",
    selected_date: "",
    time: "",
    sunrise: "06:00",
    quote: "",
    image: "https://clipground.com/images/atmosphere-sunrise-sunrise-clipart-4.jpg"
}

getDate=(date, dateString) =>{
  this.setState({
    selected_date: dateString,
  });
}

getEastern=(uniTime) => {
  var hours, Est;
  if(uniTime.substring(2,3) === ":") {
    hours = parseInt(uniTime.substring(0, 2));
    Est = (hours - 4).toString() + uniTime.substring(2);
  }
  else {
    hours = parseInt(uniTime.substring(0, 1));
    Est = (hours - 4).toString() + uniTime.substring(1);
  }
    this.setState({
      time: Est, 
    })
}

componentDidMount() {
  var f = "https://api.sunrise-sunset.org/json?lat=" + this.state.latitude  + "&lng=" + this.state.longitude + "&date="  + this.state.selected_date;
  fetch(f).then(res => res.json()).then(res => {
  })
}

seeTime() {
  fetch("https://api.sunrise-sunset.org/json?lat=" + this.state.latitude  + "&lng=" + this.state.longitude + "&date="  + this.state.selected_date).then(response => response.json())
    .then(
      res => {
        this.setState({
          sunrise: res.results.sunrise,
        })
        this.getEastern(this.state.sunrise);
        var q = "On " + this.state.selected_date + ", Sunrise will occur at: " + this.state.time;
        this.setState({
          quote: q
        })
      }
    );
}


  render() {
    return (
      <div className="App">
      <div>
        <Row>
      <Col span={8} className="Back"> By James Lim</Col>
      <Col span={8} className="App-header">See the Sun</Col>
      <Col span={8} className="Back"> at Humpback Rock, VA </Col>
      </Row>
      </div>
      
       <br></br>
        <div >
        <Row>
            <DatePicker className="App-Date" onChange={this.getDate}  style={{ width: 240, margin: 20}}/>
        </Row>
        </div >
        <Button  className="App-Button" onClick={() => this.seeTime()}>
          Check Time
        </Button>
        <br></br>
        <div>
        <header className="App-Text">{this.state.quote}</header>
        <img src={this.state.image} width="700" height="390" />
        </div>
      </div>
      
    );
  }
}

export default App;
