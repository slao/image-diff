var assert = require('assert');
var getPixels = require('get-pixels');
var imageDiff = require('../lib/image-diff.js');

describe('image-diff', function () {
  describe('diffing different images', function () {
    before(function (done) {
      var that = this;
      imageDiff({
        actualImage: __dirname + '/test-files/checkerboard.png',
        expectedImage: __dirname + '/test-files/white.png',
        diffImage: __dirname + '/actual-files/different.png',
      }, function (err, imagesAreSame) {
        that.err = err;
        that.imagesAreSame = imagesAreSame;
        done();
      });
    });
    before(function (done) {
      var that = this;
      getPixels(__dirname + '/actual-files/different.png', function (err, pixels) {
        that.actualPixels = pixels;
        done(err);
      });
    });
    before(function (done) {
      var that = this;
      getPixels(__dirname + '/expected-files/different.png', function (err, pixels) {
        that.expectedPixels = pixels;
        done(err);
      });
    });

    it('asserts images are different', function () {
      assert.strictEqual(this.imagesAreSame, false);
    });

    it('writes an image diff to disk', function () {
      assert.deepEqual(this.actualPixels, this.expectedPixels);
    });
  });

  describe('diffing the same image', function () {
    before(function (done) {
      var that = this;
      imageDiff({
        actualImage: __dirname + '/test-files/checkerboard.png',
        expectedImage: __dirname + '/test-files/checkerboard.png',
        diffImage: __dirname + '/actual-files/same.png',
      }, function (err, imagesAreSame) {
        that.err = err;
        that.imagesAreSame = imagesAreSame;
        done();
      });
    });

    it('asserts images are the same', function () {
      assert.strictEqual(this.imagesAreSame, true);
    });
  });
});
