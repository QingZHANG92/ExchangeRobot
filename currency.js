var util = require('util');
var fx = require('money'),
    oxr = require('open-exchange-rates');

    oxr.set({
        app_id: '4eee9be43a394269aa11982d4d40ef7c',
    });

    // Get latest exchange rates from API and pass to callback function:
    oxr.latest(function(error) {
        if ( error ) {
            // `error` will contain debug info if something went wrong:
            console.log( 'ERROR loading rates from API! Error was:' )
            console.log( error.toString() );

            // You could use hard-coded rates if error (see readme)
            return false;
        }

        // Rates are now stored in `oxr` object as `oxr.rates` - enjoy!
        // Examples to follow:

        // The timestamp (published time) of the rates is in `oxr.timestamp`:
        console.log('timestamp: ' + (new Date(oxr.timestamp)).toUTCString());

        // Each currency is a property in the object/hash, e.g:
        //console.log('USD -> AED: ' + oxr.rates.AED);
        //console.log('USD -> HKD: ' + oxr.rates['HKD']);

        // To load rates into the money.js (fx) library for easier currency
        // conversion, simply apply the rates and base currency like so:
        fx.rates = oxr.rates;
        fx.base = oxr.base;

        // money.js is now initialised with the exchange rates:
        var amount = fx(1).from('EUR').to('CNY').toFixed(6);
        console.log( '1 EUR in CNY: ' + amount );
    });
