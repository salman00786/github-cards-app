import './App.css';
import React from 'react';
import axios from 'axios';
 





const CardList = (props) =>(
 <div>
     {props.profiles.map(profiless =><Card{...profiless}/>)}
 </div>
)

class Card extends React.Component{
  render(){
    let profile = this.props;
    return(
      <div style={{textAlign:"center"}}>
      <div className="github-profile"></div>
      <img src={profile.avatar_url}/>
      <div className="name">{profile.name}</div>
      <div className="company">{profile.company}</div>
      </div>
    )
  }
}

class Form extends React.Component{
    state = {userName :""}
    handleSubmit= async (event)=>{
     event.preventDefault();
     const resp= await axios.get(`https://api.github.com/users/${this.state.userName}`)
   this.props.onSubmit(resp.data);
   this.setState({userName:""});
    
     
    }
  render() {       
    return(
      <form action="" onSubmit={this.handleSubmit}>
        <input type="text"
        placeholder="Enter Username..." 
        value={this.state.userName}
        onChange = {event => this.setState({userName:event.target.value})}
        
       
       
        required/>
        <button className="submitBtn">Add Card</button>
      </form>
    )
  }
}



class App extends React.Component{
  state ={
    profiles : [],
  };


  addNewProfile = (profileData) =>{
    this.setState(prevState => ({ profiles:[...prevState.profiles, profileData],}))
    console.log("test",profileData)
  }
  render(){
    return(
      <div>
      <div className="header">{this.props.title}</div>
      <Form onSubmit={this.addNewProfile}/>
      <CardList profiles={this.state.profiles}/>
      </div>
    )
  }
}



export default App;
