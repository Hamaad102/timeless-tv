import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import './App.css'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      query: '',
      show: null,
      id: 0,
      poster: '',
      name: '',
      desc: '',
      seasons: 0,
      episodes: 0
    }
  }

  search(){
    let accessToken = '9cef6ec27cc93a5a6cc36bba84fac6f4';
    let BASE_URL = `https://api.themoviedb.org/3/search/tv?api_key=${accessToken}&language=en-US&query=${this.state.query}&page=1`;
    fetch(BASE_URL)
    .then(response => response.json())
    .then(json => {
      const show = json.results[0];
      this.setState({
        show: show.original_name,
        id: show.id,
        // poster: show.poster_path
       });
      let INFO_URL = `https://api.themoviedb.org/3/tv/${this.state.id}?api_key=${accessToken}&language=en-US`;
      fetch(INFO_URL)
      .then(response=> response.json())
      .then(json => {
        let season;
        if(json.seasons.length===1){
          season = 0;
        }else{
          season = Math.floor(Math.random() * (json.seasons.length - 1) + 1);
        }
        let episode = Math.floor(Math.random() * (json.seasons[season].episode_count - 1) + 1);
        if(season===0){
          season = 1;
        }
        this.setState({
          seasons: season,
          episodes: episode
        });
        let NAME_URL = `https://api.themoviedb.org/3/tv/${this.state.id}/season/${this.state.seasons}?api_key=${accessToken}&language=en-US`;
        fetch(NAME_URL)
        .then(response => response.json())
        .then(json => {
          this.setState({
            name:json.episodes[this.state.episodes-1].name
          });
          let DETAIL_URL = `https://api.themoviedb.org/3/tv/${this.state.id}/season/${this.state.seasons}/episode/${this.state.episodes}?api_key=${accessToken}&language=en-US`;
          fetch(DETAIL_URL)
          .then(response => response.json())
          .then(json => {
            this.setState({
              desc: json.overview
            });
          });
          let IMAGE_URL = `https://api.themoviedb.org/3/tv/${this.state.id}/season/${this.state.seasons}/episode/${this.state.episodes}/images?api_key=${accessToken}`;
          fetch(IMAGE_URL)
          .then(response => response.json())
          .then(json => {
            if(json.stills.length>0){
              this.setState({
                poster: json.stills[0].file_path
              });
            }else{
              this.setState({
                poster: '0'
              });
            }
          });
        });
      });
    });
  }


  render(){
    return(
      <div>
        <div className="navigation container-fluid">

          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-12"><p className="App-title">timeless</p></div>
            <div className="col-md-8 col-sm-8 col-xs-12 searchBar">
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon onClick={() => {if(this.state.query!==''){this.search()}}}>
                    <Glyphicon glyph="search"></Glyphicon>
                  </InputGroup.Addon>
                  <FormControl
                    type="text"
                    placeholder="search your favorite show"
                    value={this.state.query}
                    onChange={event => {this.setState({query: event.target.value})}}
                    onKeyPress={event => {
                      if(event.key==='Enter' && event.target.value!==''){
                        this.search();
                      }
                    }}
                  />
                </InputGroup>
              </FormGroup>
            </div>

          </div>
        </div>
        <div className="container">
          <div className="row">
            {
              this.state.poster!==''
              ?
              <Profile
                className="Profile"
                show={this.state.show}
                poster={this.state.poster}
                name={this.state.name}
                description={this.state.desc}
              />
              : <div className='col-md-12 col-sm-12 style help'>Want to rewatch an episode of your favorite show but can't decide which episode?
                <br/>Type in the name of your show and we'll do the rest!</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
