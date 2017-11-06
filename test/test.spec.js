import { assert } from 'chai';
import FN from '../src';

describe('FN.amend', () => {
  function check(num1, result) {
    assert.strictEqual(FN.amend(num1), result);
  }

  it('can eliminate rounding errors', () => {
    check(0.09999999999999998, 0.1);
    check(1.0000000000000001, 1);
  });

  it('can eliminate rounding errors when arguments is string', function(){
    check('0.09999999999999998', 0.1);
    check('1.0000000000000001', 1);
  });
});

describe('FN.getDigitLength', () => {
  function check(num, result) {
    assert.strictEqual(FN.getDigitLength(num), result);
  }

  it('can do getDigitLength operation', () => {
    check(123.4567890123, 10);
    check(1.23e-5, 7);
    check(1.23E-5, 7);
    check(1.233467e-5, 11);
    check(123.45e-5, 7);
    check(1.23e-10, 12);
    check(1.23e1, 1);
    check(1e20, 0);
    check(1.12345e20, 0);
    check(1.123e30, 0);
    check(1.123e-100, 103);
  });

  it('can do getDigitLength operation when argument is string', () => {
    check('123.4567890123', 10);
    check('1.23e-5', 7);
    check('1.23E-5', 7);
    check('1.233467e-5', 11);
    check('123.45e-5', 7);
    check('1.23e-10', 12);
    check('1.23e1', 1);
    check('1e20', 0);
    check('1.12345e20', 0);
    check('1.123e30', 0);
    check('1.123e-100', 103);
  });
});

describe('FN.transToInt', () => {
  function check(num, result) {
    assert.strictEqual(FN.transToInt(num), result);
  }

  it('can translate float to fixed', () => {
    check(1e-1, 1);
    check(1e-6, 1);
    check(1e-7, 1);
    check(1e-13, 1);
    check(1.123e30, 1.123e30);
    check(1.6e-30, 16);
    check(1.234567e-13, 1234567);
    check(1.2345678912345e10, 12345678912345);

    check(1E-1, 1);

    check(1.234, 1234);
  });

  it('can translate float to fixed when argument is string', ()=>{
    check('1.234567E-13', 1234567);
    check('1.2345678912345e10', 12345678912345);

    check('1.234', 1234);
  });
});

describe('FN.plus', () => {
  function check(){
    let args = [].slice.call(arguments),
        len = args.length,
        result = args[len-1],
        rest = args.slice(0,len-1);

    assert.strictEqual(FN.plus.apply(null,rest), result);
  }

  it('can do plus operation, basic usage', () => {
    check(0.1, 0.2, 0.3);
    check(2.3, 2.4, 4.7);
    check(-1.6, -1, -2.6);
    check(-2.0, 63, 61);
    check(-3, 7, 4);
    check(-221, 38, -183);
    check(-1, 0, -1);
    check(2.018, 0.001, 2.019);
    check(1.3224e10, 1.3224e3, 13224001322.4);
    check(1.6e-30, 1.6e-30, 3.2e-30);
    check(1.6E-30, 1.6e-30, 3.2e-30);
  });

  it('arguments are flexible', ()=>{
    check(0);
    check(1,2,3, 6);
    check(0.1,0.1,0.1, 0.3);
    check(2.3,2.4,2.52, 7.22);
  });

  it('arguments are string', ()=>{
    check('1','2','3', 6);
    check('2.3','2.4','2.52', 7.22);

    check('1.3224e10', '1.3224E3', 13224001322.4);
  });
});



describe('FN.minus', () => {
  function check() {
    let args = [].slice.call(arguments),
        len = args.length,
        result = args[len-1],
        rest = args.slice(0,len-1);
    assert.strictEqual(FN.minus.apply(null, rest), result);
  }

  it('can do minus operation', () => {
    check(0.07, 0.01, 0.06);
    check(0.7, 0.1, 0.6);
    check(1.0, 0.9, 0.1);
    check(1, 0, 1);
    check(1, -0, 1);
    check(-1, 0, -1);
    check(-1, -0, -1);
    check(1, 22, -21);
    check(8893568.397103781249, -7.29674059550, 8893575.693844376749);
    check(105468873, 0, 105468873);

    check(1.23e5, 10, 122990);
    check(1.23e-5, 1.0023, -1.0022877);
    check(1.3224e10, 21, 13223999979);
    check(1.3224e10, 1.3224e3, 13223998677.6);
    check(1.7e-30, 0.1e-30, 1.6e-30);
  });


  it('arguments are flexible', ()=>{
    check(0);
    check(6,3,2, 1);
    check(0.9,0.5,0.1, 0.3);
  });

  it('arguments are string', ()=>{
    check('6','3',2, 1);
    check(0.9,'0.5',0.1, 0.3);

    check('1.3224e10', '1.3224E3', 13223998677.6);

    check('1.7e-30', '0.1E-30', 1.6e-30);
  });
});


describe('FN.multi', () => {
  function check() {
    let args = [].slice.call(arguments),
        len = args.length,
        result = args[len-1],
        rest = args.slice(0,len-1);
    assert.strictEqual(FN.multi.apply(null,rest), result);
  }

  it('can do multi operation', () => {
    check(0.07, 100, 7);
    check(0.7, 0.1, 0.07);
    check(3, 0.3, 0.9);
    check(118762317358.75, 1e-8, 1187.6231735875);
    check(0.362, 100, 36.2);
    check(1.1, 1.1, 1.21);
    check(2.018, 1000, 2018);
    check(5.2, -3.8461538461538462, -20);
    check(1.22, -1.639344262295082, -2);
    check(2.5, -0.92, -2.3);
    check(-2.2, 0.6363636363636364, -1.4);
    // check(-3, 2.3333333333333335, -7);
    // check(-0.076, -92.10526315789471, 7);
    check(8.0, -0.3625, -2.9);
    check(6.6, 0.30303030303030304, 2);
    check(10.0, -0.8, -8);
    check(-1.1, -7.272727272727273, 8);

    check(-1.23e4, 20, -246000);
    check(1.7e-30, 1.5e20, 2.55e-10);
  });

  it('arguments are flexible', ()=>{
    check(0);
    check(0.7,0.1,0.1, 0.007);
    check(5.2, -3.8461538461538462,0.5, -10);
  });

  it('arguments are string', ()=>{
    check('0.7','0.1','0.1', 0.007);
    check(5.2, '-3.8461538461538462',0.5, -10);

    check('1.7e-30', '1.5E20', 2.55e-10);
  });
});


describe('FN.divide', () => {
  function check() {
    let args = [].slice.call(arguments),
        len = args.length,
        result = args[len-1],
        rest = args.slice(0,len-1);
    assert.strictEqual(FN.divide.apply(null, rest), result);
  }

  it('can do divide operation', () => {
    check(1.21, 1.1, 1.1);
    check(4750.49269435, 4, 1187.6231735875);
    check(0.9, 3, 0.3);
    check(36.2, 0.362, 100);
    check(-20, 5.2, -3.8461538461538462);
    check(-2, 1.22, -1.639344262295082);
    check(-2.3, 2.5, -0.92);
    check(-1.4, -2.2, 0.6363636363636364);
    check(7, -3, -2.3333333333333335);
    check(7, -0.076, -92.10526315789471);
    check(-2.9, 8.0, -0.3625);
    check(2, 6.6, 0.30303030303030304);
    check(-8, 10.0, -0.8);
    check(8, -1.1, -7.272727272727273);

    check(-1.23e4, 20, -615);
    check(2.55e-10, 1.7e-30, 1.5e20);
  });

  it('arguments are flexible', ()=>{
    check(0);
    check(1,1);
    check(100, 50, 2);
    check(100, 5, 4, 5);
    check(0.9, 3, 2, 5, 0.03);
  });

  it('arguments are string', ()=>{
    check('100', '50', 2);
    check(100, '5', 4, 5);
    check(0.9, '3', '2', '5', 0.03);

    check('2.55e-10', '1.7E-30', 1.5e20);
  });
});



describe('FN.toFixed', () => {
  function check(num, ratio, result) {
    assert.strictEqual(FN.toFixed(num, ratio), result);
  }

  it('can do toFixed operation', () => {
    check(0, 1, 0);
    check(0, 0, 0);
    check(0.7875, 3, 0.788);
    check(0.105, 2, 0.11);
    check(1, 1, 1);
    check(0.1049999999, 2, 0.1);
    check(0.105, 1, 0.1);
    check(1.335, 2, 1.34);
    check(1.35, 1, 1.4);
    check(12345.105, 2, 12345.11);
    check(0.0005, 2, 0);
    check(0.0005, 3, 0.001);

    check(1.2345e3, 3, 1234.5);
    check(1.2344e3, 3, 1234.4);
    check(1e3, 1, 1000);
  });

  it('can do toFixed operation when arguments are string', ()=>{
    check('0.105', 2, 0.11);

    check('1.2345E3', 3, 1234.5);
  });
});

describe('FN.noConflict', ()=>{
  let newNameForFN = FN.noConflict();

  it('New name for FN', ()=>{
    assert.strictEqual(newNameForFN.plus(1,2), 3);
  });
});
