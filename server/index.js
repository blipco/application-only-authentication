const express = require('express');
const axios = require('axios');
var app = express();

// Your server will hold your bearer token
var bearer = 'AAAAAAAAAAAAAAAAAAAAAEeq6AAAAAAA%2Bb48mPRW1azlxNQ1l7T6DVil1w0%3DsPTJKTGqqzkIBwxxq2PhKTWNJXrOiWEpDpwe4emY9pH2s5NwIO';

// This will allow us to hit our server from localhost:3000. Prevents cors issues
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});
app.use('/', express.static('build'));


app.get('/api/', (req,res) => {
    
    //Insert your consumer key and secret here
    //Hint: You're going to want to encode them (https://developer.twitter.com/en/docs/basics/authentication/overview/application-only#issuing-application-only-requests)
    let consumer_key = 'cT2NuPdCg9CHO77vjQJX8SnOC';
    let consumer_secret = '9JfHamS8jKj1MxkvCzDX6U0KcM1OfizhM8uh5BLu39jHBb6ptl';
    
    // Token should be "Bearer token credentials"
    let token = 'cT2NuPdCg9CHO77vjQJX8SnOC:9JfHamS8jKj1MxkvCzDX6U0KcM1OfizhM8uh5BLu39jHBb6ptl';

    // Convert your token to base64
    let credentials = 'Y1QyTnVQZENnOUNITzc3dmpRSlg4U25PQzo5SmZIYW1TOGpLajFNeGt2Q3pEWDZVMEtjTTFPZml6aE04dWg1Qkx1MzlqSEJiNnB0bA==';

    // Create headers for axios post request
    var headers = {
        Authorization: 'Basic Y1QyTnVQZENnOUNITzc3dmpRSlg4U25PQzo5SmZIYW1TOGpLajFNeGt2Q3pEWDZVMEtjTTFPZml6aE04dWg1Qkx1MzlqSEJiNnB0bA==',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    };

    // The body of the request
    var body = 'grant_type=client_credentials';

    axios.post('https://api.twitter.com/oauth2/token', body, { headers })
    .then(response => {
        res.json(response.data);
    })
    .catch(err => res.send(err.message));
});


// This route gets tweets!
app.get('/api/tweets/:s', (req,res) => {
  let search = encodeURIComponent(req.params.s);
  axios.get(`https://api.twitter.com/1.1/search/tweets.json?q=${search}&geocode=32.7157,-117.1611,10mi`, {
      headers: {
          'Authorization': `Bearer ${bearer}`,
      }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(err => {
    res.json(err.message);
  });
});


// This starts your server!
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
