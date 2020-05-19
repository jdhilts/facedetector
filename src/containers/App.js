import React from 'react';
import '../App.css';
import Particles from 'react-particles-js';
import Nav from '../components/nav/Nav';
import Input from '../components/input/Input';
import Rank from '../components/rank/Rank';
import FaceImage from '../components/faceimage/FaceImage';
import Logo from '../components/logo/Logo';
import SignIn from '../components/signin/SignIn';
import Register from '../components/register/Register';

const particlesOptions = {
  particles: { 
    number: { 
      value: 160,
      density: { 
        enable: true,
        value_area: 900 
      }
    }
  }
}

const initialState = {
      input:'',
      image:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        password:'',
        entries: '',
        joined: ''
      }
    }  

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  loadUser = (user) => {
    this.setState({
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const faceImg = document.getElementById('inputImage');
    const width = Number(faceImg.width);
    const height = Number(faceImg.height);  
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height, 
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)  
    }
  }

  faceDetectBox = (box) => this.setState({box});

  onInputChange = (event) => this.setState({input: event.target.value});

  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({image: this.state.input});
    fetch('https://murmuring-coast-74763.herokuapp.com/imageurl', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json())
    .then(response => {
      if(response){
      fetch('https://murmuring-coast-74763.herokuapp.com/image', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })       
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
        .catch(console.log)
      }
      this.faceDetectBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if( route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render(){
    const {image, box, route, isSignedIn} = this.state;
    return (
      <div className = 'App'>
      <Particles className = 'particles' params = {particlesOptions}/>
      <Nav isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
      <Logo/>
      { route === 'home' ?  
      <div>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <Input onInputChange = {this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>       
      <FaceImage box = {box} image = {image}/>
      </div>
      : (
        route === 'signin' ? 
        <SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        : <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
        )
    }
    </div>
    );
  }
}
export default App;
