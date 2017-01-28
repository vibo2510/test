var express = require('express');
var router = express.Router();
var Sitzplatz = require('../prototypes/sitzplatz');
var Kino = require('../prototypes/kino');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/kinoreservierung';


/*
var anzahlSitze=100;
var sitzplaetze=[];

for(var i=0; i<anzahlSitze;i++){
    sitzplaetze.push(new Sitzplatz(i+1, true));
}

var sitzreihen=[];
var sitzreihenLaenge=20;

for(var i=0; i< sitzplaetze.length;i+=sitzreihenLaenge){
    sitzreihen.push(sitzplaetze.slice(i,i+sitzreihenLaenge));
}


var kino = new Kino(sitzreihen);

*/
/*
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('kino1').insertMany(sitzplaetze, function(err, result) {
            assert.equal(null, err);
            console.log('Item inserted');
            db.close();
        });
    });
*/



/* GET home page. */
router.get('/', function(req, res, next) {
        var sitze = [];
        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            var cursor = db.collection('kino1').find();
            cursor.forEach(function(sitz, err) {
                assert.equal(null, err);
                sitze.push(sitz);
            }, function() {
                db.close();
                var sitzreihen=[];
                var sitzreihenLaenge=20;

                for(var i=0; i< sitze.length;i+=sitzreihenLaenge){
                    sitzreihen.push(sitze.slice(i,i+sitzreihenLaenge));
                }

                var kino = new Kino(sitzreihen);
                res.render('index', {
                    title:'Kinoreservierung',
                    kino1: kino
                });
            });
        });


});

router.get('/kaufen/:_id/:isFree', function (req, res) {

    var id= req.params._id;
    var status= req.params.isFree;
    console.log('Status:'+status);


    var newStatus;
    if(status.localeCompare("false")==0){
        newStatus= true;
    }
    if(status.localeCompare("true")==0){
        newStatus=false;
    }


    console.log('newStatus:'+newStatus);
    mongo.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log(req.params._id);
        db.collection('kino1').update({'_id': objectId(id)}, {$set: {isFree: newStatus}}, function(err, result) {
            assert.equal(null, err);
            console.log('Item updated');
            db.close();
        });
    });
    res.redirect('/');
});




module.exports = router;
