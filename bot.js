var Twit = require('twit');
var util = require('util');
var fx = require('money'),
    oxr = require('open-exchange-rates');

oxr.set({
    app_id: '4eee9be43a394269aa11982d4d40ef7c',
});

var T = new Twit({
    consumer_key:         '6taIBGmeh6qeXiivlQJLYUKje'
  , consumer_secret:      'mSvSOByhbYXONkty592kSFcYM0jtMpFmQVcVrUgmZDkksNGSOr'
  , access_token:         '3251194611-3Am8pR6iiKZrTfP9KXolzPgUk2ojGox21wRJQCG'
  , access_token_secret:  'fsam6qT0qjhrt0cNQ2ReHZQE1D36Pyo8Wphyw4zHy71nC'
});

if (typeof(id) == 'undefined'){
  id = 601349878854320101;
}

function tuto(user_to){
  var steps = "Tips : try something like \"-100:EUR TO USD-\" that means 100 euros in how much dollars. Attention: All in upper case";
  T.post('statuses/update', {status: '@'+user_to+' '+steps}, function(err, data, response) {
    console.log("Reply tweet tip");
    console.log(util.inspect(err, false, null));
  });
}

function bot(){
  T.get('statuses/mentions_timeline', {since_id : id}, function(err, data, response) {
    if (typeof(data) != 'undefined'){
        //console.log(util.inspect(data[0], false, null));
        user = {
          id : data[0].user.id,
          name : data[0].user.name,
          screen_name : data[0].user.screen_name
        };
        id = data[0].id;
        if ((data[0].text.indexOf(" TO ") > -1)&&(data[0].text.indexOf("Tips :") == -1)){
          text = data[0].text.replace('@'+data[0].in_reply_to_screen_name+' ', "");
          left = text.indexOf("-");
          right = text.lastIndexOf("-");
          if ((left >-1)&&(right>-1)&&(left!=right)){
            text = text.slice(left+1, right);
          }
          else{
            tuto(user.screen_name);

            return false
          }
          text = text.split(" TO ");
          first = text[0].trim().split(":");
          second = text[1].trim();
          curr = {
            amount : first[0],
            from : first[1],
            to : second,
          };
          //console.log(util.inspect(curr, false, null));
          oxr.latest(function(error) {
              if ( error ) {
                  // `error` will contain debug info if something went wrong:
                  console.log( 'ERROR loading rates from API! Error was:' )
                  console.log( error.toString() );

                  // You could use hard-coded rates if error (see readme)
                  return false;
              }
              //console.log(util.inspect(curr, false, null));
              // Rates are now stored in `oxr` object as `oxr.rates` - enjoy!
              // Examples to follow:

              // The timestamp (published time) of the rates is in `oxr.timestamp`:
              //console.log('timestamp: ' + (new Date(oxr.timestamp)).toUTCString());

              // Each currency is a property in the object/hash, e.g:
              //console.log('USD -> AED: ' + oxr.rates.AED);
              //console.log('USD -> HKD: ' + oxr.rates['HKD']);

              // To load rates into the money.js (fx) library for easier currency
              // conversion, simply apply the rates and base currency like so:
              fx.rates = oxr.rates;
              fx.base = oxr.base;

              // money.js is now initialised with the exchange rates:
              var amount = fx(curr.amount).from(curr.from).to(curr.to).toFixed(6);
              //console.log( '1 '+curr.from+' in '+curr.to+': ' + amount );
              var str= curr.amount+' '+curr.from+' in '+curr.to+': ' + amount;
              //return str;
              T.post('statuses/update', {status: '@'+user.screen_name+' '+str}, function(err, data, response) {
                console.log("Reply tweet convert");
                console.log(util.inspect(err, false, null));
              });
          });
          //console.log(util.inspect(str_exchange, false, null));
          /*T.post('statuses/update', {status: '@'+user.screen_name+' '+str_exchange}, function(err, data, response) {
            console.log(util.inspect(data, false, null));
          });*/
        }
        else{
          if (data[0].text.indexOf("Tips ") == -1){
            tuto(user.screen_name);

            return false;
          }
        }
      }
      //console.log(util.inspect(data, false, null));
  });
}

//bot();
setInterval(bot, 60000);
