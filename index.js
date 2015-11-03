var schemas = require('./commands');
var pjson = require('./package.json');
var _ = require('underscore');
var moment = require('moment');
var urlencode = require('urlencode');
var validator = require('mandrill-webhook-validator');
var parse = require('parse-headers');

var service = {
    "name": "mandrill",
    "label": "Mandrill",
    "description": "Get Mandrill events on a webhook",
    "version": pjson.version,
    "private": true,
    "form_options": null,
    "is_oauth": false,
    "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/integrations/mandrill/logos/mandrill-logo.png",
    "server_integration": true,
    "frontend_integration": true,
    "webhook_commands":["process_hook"]
};

module.exports = function(options) {
    var lpis = this;

    options = lpis.util.deepextend({
    },options);

    lpis.add({lpi:'mandrill',cmd:'about'},about);
    lpis.add({lpi:'mandrill',cmd:'list'},list);
    lpis.add({lpi:'mandrill',cmd:'process_hook'},process_hook);

    return {
        name:'mandrill'
    };

    function about (args, done ){
        return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }

    function process_hook(args,done){
        var config = args.config;
        var event = urlencode.parse(args.env.post,{charset: "utf8"});
        var event_list = JSON.parse(event['mandrill_events']);
        var list = [];

        /*
        Transform {"values":[3.93334181897621],"dstypes":["derive"],"dsnames":["value"],"time":1441929398.594,"interval":60.000,"host":"1642568916381235172","plugin":"mysql","plugin_instance":"linchpin","type":"mysql_commands","type_instance":"select"}
        Into LinchPin events, i.e.
        {value:3.93334181897621, ds_type: derive, interval: 60.0, host:"1642568916381235172", plugin:"mysql",plugin_instance:"linchpin","type":"mysql_commands","type_instance":"select",LinchPin:{CreatedTime:'ISOTIME'} }
         */

        console.log(event);

    if (config.validate_signature == true) {
        var key = config.api_key;
        var headers = parse((args.env.headers).join('\n'));
        var signature = headers['x-mandrill-signature'];
        var endpoint = headers['x-linchpin-endpoint'];
        var csig = validator.makeSignature(key, endpoint, event);
        if (signature !== csig) {
            return done(new Error("Invalid signature"));
        }
    }

    if(_.isArray(event_list)){
        event_list.forEach(function(mandrill_event){
            var event = {
                LinchPin:{
                    CreatedTime: moment.unix(mandrill_event.ts).utc().toISOString(),
                    LastUpdatedTime: moment.unix(mandrill_event.ts).utc().toISOString()
                }
            };
            list.push(_.extend(mandrill_event,event));
        });
    }

        done(null, list);
    }
};