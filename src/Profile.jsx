import React, { Component } from 'react';
import './App.css'

class Profile extends Component{
  render(){
    return(
      <div className="profile">
        <div className="col-md-5 col-sm-12 col-xs-12">
          <div className='style'><h1>{this.props.show}</h1></div>
          <div className='style'><h3>{this.props.name}</h3></div>
          <div className='style'><h4>{this.props.description}</h4></div>
        </div>
        <div className="col-md-4 col-sm-12 col-xs-12">
          {
            this.props.poster!=='0'
            ?
            <img src={`https://image.tmdb.org/t/p/w500/${this.props.poster}`} alt="Promo of the episode"/>:<div className='style miss'>N/A</div>
          }
        </div>
      </div>
    )
  }
}

export default Profile;
