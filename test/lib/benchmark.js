/*global require, describe, it, beforeEach, afterEach*/
var proxyquire = require('proxyquire'),
mocha = require('mocha'),
  chai = require('chai'),
  should = chai.should(),
  sinon = require('sinon'),
    assert = chai.assert,
    cp = require('child_process');

//var Benchmark = proxyquire('../../lib/benchmark.js',{child_process: cp});
var Benchmark = require('../../lib/benchmark.js');
var benchmark = null;

describe('Benchmark', function () {
  beforeEach(function () {
    benchmark = new Benchmark();
  });

//  describe('#terminate', function () {
//    it('should call close if no keepAlive options', function () {
//      var stubClose = sinon.stub(benchmark, 'close');
//
//      benchmark.terminate();
//
//      assert(stubClose.called);
//    });
//
//    it('shouldn\'t call close if keepAlive options', function () {
//      var stubClose = sinon.stub(benchmark, 'close');
//
//      benchmark.options.keepAlive = true;
//      benchmark.terminate();
//
//      assert(stubClose.notCalled);
//    });
//
//    it('should call _report method for display', function () {
//      var stub = sinon.stub(benchmark, '_report');
//
//      benchmark.terminate();
//
//      assert(stub.called);
//    });
//  });
    describe('#start', function(){
        var util = require('util');
        var EventEmitter = require('events');
        function MyEmitter() {
            EventEmitter.call(this);
        }
        util.inherits(MyEmitter, EventEmitter);
        MyEmitter.prototype.send = function(message){
            if(message.msg == 'run'){
                this.emit('message', {action: 'done'});
            }
        };
        it('should call launch 1 time',function(done){
            var stubFork = sinon.stub(cp, 'fork', function(){console.log('fork!');return new MyEmitter();});
            var stubSetTimeout = sinon.stub(global, 'setTimeout', function(fn){console.log('timeout!');fn()});
            var spyWarm = sinon.spy(Benchmark.prototype, 'warm');
            var launchCounter = 0;
            var stubLaunch;
            var restore = function(){
                stubFork.restore();
                stubFork.restore();
                stubSetTimeout.restore();
                spyWarm.restore();
                stubLaunch.restore();
            };

            stubLaunch = sinon.stub(Benchmark.prototype, 'launch',function(){console.log('launch called');launchCounter++; done()});
            benchmark.start(1,1,1,1,5);
            assert.equal(launchCounter,1);
            restore();
        });

        it('should call warm 6 time',function(done){
            var stubFork = sinon.stub(cp, 'fork', function(){console.log('fork!');return new MyEmitter();});
            var stubSetTimeout = sinon.stub(global, 'setTimeout', function(fn){console.log('timeout!');fn()});
            var spyWarm = sinon.spy(Benchmark.prototype, 'warm');
            var launchCounter = 0;
            var stubLaunch;
            var restore = function(){
                stubFork.restore();
                stubFork.restore();
                stubSetTimeout.restore();
                spyWarm.restore();
                stubLaunch.restore();
            };

            stubLaunch = sinon.stub(Benchmark.prototype, 'launch',function(){console.log('launch called');launchCounter++; done()});
            benchmark.start(1,1,1,1,5);
            assert.equal(spyWarm.callCount, 6);
            restore();
        });

    });
});
