'use strict';

const assert = require('assert');

require('./index.js');

describe('not', () => {
  it('should work with boolean', () => {
    assert.equal(true.not, !true);
    assert.equal(false.not, !false);
  });
  it('should work with number', () => {
    assert.equal((0).not, !0);
    assert.equal((1).not, !1);
    Array(100)
      .fill(0)
      .map(() => Math.random())
      .forEach(n => assert.equal(n.not, !n));
    Array(100)
      .fill(0)
      .map(() => Math.floor(Math.random() * (10 - -10)) + -10)
      .forEach(n => assert.equal(n.not, !n));
  });
  it('should work with string', () => {
    assert.equal(''.not, !'');
    assert.equal('string'.not, !'string');
  });
  it('should work with array', () => {
    const arr = [false, 1, '', 2, 0, 3];
    arr.not.forEach((element, i) => assert.equal(element, [
      true, false, true, false, true, false,
    ][i]));
  });
  describe('with function', () => {
    it('should work with function', () => {
      function fb() {
        return true;
      }
      function fn() {
        return 1;
      }
      function fs() {
        return 'string';
      }
      assert.equal(fb.not(), !fb());
      assert.equal(fn.not(), !fn());
      assert.equal(fs.not(), !fs());
    });
    it('should work with arrow function', () => {
      const fb = () => true;
      const fn = () => 1;
      const fs = () => 'string';
      assert.equal(fb.not(), !fb());
      assert.equal(fn.not(), !fn());
      assert.equal(fs.not(), !fs());
    });
  });
  describe('with object', () => {
    const obj = {
      f() {
        return true;
      },
      truly: true,
    };
    it('should work with getter', () => {
      assert.equal(obj.not.f(), !obj.f());
      assert.equal(obj.not.truly, !obj.truly);
    });
    it('shouldnt work with setter', () => {
      assert.throws(() => { obj.not.truly = 'truly'; }, TypeError);
    });
    it('should work with in', () => {
      assert.equal('a' in { a: 0 }.not, false);
      assert.equal('b' in { a: 0 }.not, true);
    });
    it('shouldnt work with delete', () => {
      assert.throws(() => delete obj.not.truly, TypeError);
    });
    it('should work with constructor', () => {
      class Truly {
        valueOf() {
          return true;
        }
      }
      class Falsy {
        valueOf() {
          return false;
        }
      }
      assert.equal(+new Falsy.not().valueOf(), +new Truly().valueOf());
    });
    it('should be chainable', () => {
      assert(obj.not.not.truly);
    });
  });
});
