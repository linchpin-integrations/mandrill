var assert = require("chai").assert; // node.js core module
var getenv = require('getenv');

describe('stripe',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('process_hook',function(){
        it('should process mandrill events',function(done){
            var req =  {lpi:'mandrill', cmd:'process_hook', config:{name:"test","validate_signature":true,"api_key":"NBY4GGopxF5JPM8NCU7Blg"}, env:{
                headers:["Connection: close",
                    "X-Mandrill-Signature: ofCAuCdks9Lyr3RvSM61vpNR6UY=",
                    "Accept: */*",
                    "Content-Type: application/x-www-form-urlencoded",
                    "Connect-Time: 1",
                    "X-Request-Id: d5ac2435-632c-4774-a234-116d9f505785",
                    "X-Linchpin-Endpoint: http://requestb.in/o1m6loo1",
                    "Total-Route-Time: 0",
                    "Via: 1.1 vegur",
                    "Host: requestb.in",
                    "User-Agent: Mandrill-Webhook/1.0",
                    "Content-Length: 2935"],
                post:"mandrill_events=%5B%7B%22event%22%3A%22send%22%2C%22msg%22%3A%7B%22ts%22%3A1365109999%2C%22subject%22%3A%22This+an+example+webhook+message%22%2C%22email%22%3A%22example.webhook%40mandrillapp.com%22%2C%22sender%22%3A%22example.sender%40mandrillapp.com%22%2C%22tags%22%3A%5B%22webhook-example%22%5D%2C%22opens%22%3A%5B%5D%2C%22clicks%22%3A%5B%5D%2C%22state%22%3A%22sent%22%2C%22metadata%22%3A%7B%22user_id%22%3A111%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa%22%2C%22_version%22%3A%22exampleaaaaaaaaaaaaaaa%22%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa%22%2C%22ts%22%3A1446357425%7D%2C%7B%22event%22%3A%22deferral%22%2C%22msg%22%3A%7B%22ts%22%3A1365109999%2C%22subject%22%3A%22This+an+example+webhook+message%22%2C%22email%22%3A%22example.webhook%40mandrillapp.com%22%2C%22sender%22%3A%22example.sender%40mandrillapp.com%22%2C%22tags%22%3A%5B%22webhook-example%22%5D%2C%22opens%22%3A%5B%5D%2C%22clicks%22%3A%5B%5D%2C%22state%22%3A%22deferred%22%2C%22metadata%22%3A%7B%22user_id%22%3A111%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa1%22%2C%22_version%22%3A%22exampleaaaaaaaaaaaaaaa%22%2C%22smtp_events%22%3A%5B%7B%22destination_ip%22%3A%22127.0.0.1%22%2C%22diag%22%3A%22451+4.3.5+Temporarily+unavailable%2C+try+again+later.%22%2C%22source_ip%22%3A%22127.0.0.1%22%2C%22ts%22%3A1365111111%2C%22type%22%3A%22deferred%22%2C%22size%22%3A0%7D%5D%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa1%22%2C%22ts%22%3A1446357425%7D%2C%7B%22event%22%3A%22hard_bounce%22%2C%22msg%22%3A%7B%22ts%22%3A1365109999%2C%22subject%22%3A%22This+an+example+webhook+message%22%2C%22email%22%3A%22example.webhook%40mandrillapp.com%22%2C%22sender%22%3A%22example.sender%40mandrillapp.com%22%2C%22tags%22%3A%5B%22webhook-example%22%5D%2C%22state%22%3A%22bounced%22%2C%22metadata%22%3A%7B%22user_id%22%3A111%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa2%22%2C%22_version%22%3A%22exampleaaaaaaaaaaaaaaa%22%2C%22bounce_description%22%3A%22bad_mailbox%22%2C%22bgtools_code%22%3A10%2C%22diag%22%3A%22smtp%3B550+5.1.1+The+email+account+that+you+tried+to+reach+does+not+exist.+Please+try+double-checking+the+recipient%27s+email+address+for+typos+or+unnecessary+spaces.%22%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa2%22%2C%22ts%22%3A1446357425%7D%2C%7B%22event%22%3A%22soft_bounce%22%2C%22msg%22%3A%7B%22ts%22%3A1365109999%2C%22subject%22%3A%22This+an+example+webhook+message%22%2C%22email%22%3A%22example.webhook%40mandrillapp.com%22%2C%22sender%22%3A%22example.sender%40mandrillapp.com%22%2C%22tags%22%3A%5B%22webhook-example%22%5D%2C%22state%22%3A%22soft-bounced%22%2C%22metadata%22%3A%7B%22user_id%22%3A111%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa3%22%2C%22_version%22%3A%22exampleaaaaaaaaaaaaaaa%22%2C%22bounce_description%22%3A%22mailbox_full%22%2C%22bgtools_code%22%3A22%2C%22diag%22%3A%22smtp%3B552+5.2.2+Over+Quota%22%7D%2C%22_id%22%3A%22exampleaaaaaaaaaaaaaaaaaaaaaaaaa3%22%2C%22ts%22%3A1446357425%7D%5D"}};

            seneca.act(req, function(err,result){
                console.log( '%j', result );
                assert.isArray(result,'result is an Array');
                done();
            });
        })
    });

    describe('about',function(){
        it('should return integration properties',function(done){
            seneca.act( {lpi:'mandrill', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'mandrill','name is mandrill');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpi:'mandrill',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});
