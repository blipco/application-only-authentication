import axios from 'axios';
import React, { Component } from 'react';

// This is your tweet component. It should be pure!
const Tweet = (props) => {
  return (<li className="m-2">{props.tweet.text} - {props.tweet.coordinates}<hr/></li>)
}

// This is your main application
class App extends Component {
  constructor(props) {
    super(props);
    
    // We need to keep track of user input, access token, and tweets
    this.state = {
      search: '',
      access: '',
      tweets: []
    }

    // These lines bind our functions to this class
    this.getTweets = this.getTweets.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  // componentDidMount runs on page load when component is viewable
  componentDidMount() {
    axios.get('http://localhost:8080/api/').then(res => {
      this.setState({access: res.data.access_token})
    })
  }

  // This function will grab the response from our server
  getTweets() {
    axios.get(`http://localhost:8080/api/tweets/${this.state.search}`)
    .then(res => this.setState({ tweets: res.data.statuses}))
    .catch(err => console.log(err));
  }

  // This function will update our state with user's input
  setSearch(e) {
    this.setState({search: e.target.value})
    //using the user's input, save their search in App's state
  }


  // Our render function shows our content, and gets reloaded every time this.state changes
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-1 text-center">Twitter Search</h1>
          <hr />
        </div>
        <div className="row">
          <div className="col-3">
            <div className="card d-flex" id="search-card">
              <div className="card-header">
                <h2 className="d-flex justify-content-center">Search</h2>
              </div>
              <div className="card-body d-flex justify-content-center">
                <input className="" type="text" onChange={this.setSearch}/>
              </div>
              <div className="card-footer d-flex justify-content-center">
                <button onClick={this.getTweets}>Get Tweets</button>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="card d-flex">
              <div className="card-header">
                <h2 className="d-flex justify-content-center">Tweets</h2>
              </div>
              <div className="card-body" id="tweets">
                <ul>
                  { this.state.tweets && 
                    this.state.tweets.map((tweet) => {
                      return <Tweet tweet={tweet}/>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
