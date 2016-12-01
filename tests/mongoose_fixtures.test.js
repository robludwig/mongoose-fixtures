
require("coffee-script");

var async = require('async');
var path = require('path');
var expect = require('expect.js');
var mongoose = require('mongoose');
var fixturesLoader = require('../mongoose_fixtures');
var Country = require('./models/country.coffee');

describe('mongoose-fixtures test', function(){
    before(function(done){
        mongoose.connect(process.env.MONGODB_URL, done);

    });

    it('should load fixtures from a directory', function(done){
        fixturesLoader.load('./fixtures', function(err){
            expect(err).not.to.be.ok();
            var CountrySchema = mongoose.model('Country');
            CountrySchema.find({}, function(err, countries){
                expect(err).not.to.be.ok();
                expect(countries).to.be.ok();
                expect(countries).to.be.an(Array);
                expect(countries.length).to.be.eql(2);
                done();
            });
        });
    });

    it('should load fixtures from a file', function(done){
        fixturesLoader.load('./fixtures/countries.coffee', function(err){
            expect(err).not.to.be.ok();
            var CountrySchema = mongoose.connection.model('Country');
            CountrySchema.find({}, function(err, countries){
                expect(err).not.to.be.ok();
                expect(countries).to.be.ok();
                expect(countries).to.be.an(Array);
                expect(countries.length).to.be.eql(2);
                done();
            });
        });
    });

    it('should load fixtures from an object', function(done){
        var data = require('./fixtures/countries');
        fixturesLoader.load(data, function(err){
            expect(err).not.to.be.ok();
            var CountrySchema = mongoose.connection.model('Country');
            CountrySchema.find({}, function(err, countries){
                expect(err).not.to.be.ok();
                expect(countries).to.be.ok();
                expect(countries).to.be.an(Array);
                expect(countries.length).to.be.eql(2);
                done();
            });
        });
    });

    it('should return an error if db insertion throws an error', function(done){
      var data = require('./fixtures/countries');
      data.Country[0].throwError = true;
      fixturesLoader.load(data, function(err){
        expect(err).to.exist;
        expect(err).to.not.be.empty;
        done();
      })
    })
});
