var Twit = require('twit');
var util = require('util');

var T = new Twit({
    consumer_key:         '6taIBGmeh6qeXiivlQJLYUKje'
  , consumer_secret:      'mSvSOByhbYXONkty592kSFcYM0jtMpFmQVcVrUgmZDkksNGSOr'
  , access_token:         '3251194611-3Am8pR6iiKZrTfP9KXolzPgUk2ojGox21wRJQCG'
  , access_token_secret:  'fsam6qT0qjhrt0cNQ2ReHZQE1D36Pyo8Wphyw4zHy71nC'
});

T.get('application/rate_limit_status', {resource: 'statuses'}, function(err, data, response){
  console.log(util.inspect(data, false, null));
});
