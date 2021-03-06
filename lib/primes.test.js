const primes = require('./primes');
const should = require('chai').should();
const errors = primes.errors;

describe('primes', () => {
  describe('#edge cases', () => {

    it('should return an error for negative value', () => {
      should.Throw(() => primes.findPrimes(-5), Error, primes.errors.TooSmallLimit);
    });

    it('should return an error for value 0', () => {
      should.Throw(() => primes.findPrimes(-5), Error, primes.errors.TooSmallLimit);
    });

    it('should return an error for value 1', () => {
      should.Throw(() => primes.findPrimes(1), Error, primes.errors.TooSmallLimit);
    });

    it('should return an error for value > 100,000,001', () => {
      should.Throw(() => primes.findPrimes(100000001), Error, primes.errors.TooLargeLimit);
    });

  });

  describe('#happy paths', () => {
    it('should return an array of primes up to 2', () => {
      const primesNumbers = primes.findPrimes(2);
      primesNumbers.should.be.eql([2]);
    });

    it('should return an array of primes up to 5', () => {
      const primesNumbers = primes.findPrimes(5);
      primesNumbers.should.be.eql([
        2,
        3,
        5,
      ]);
    });

    it('should return an array of primes up to 101', () => {
      const primesNumbers = primes.findPrimes(101);
      primesNumbers.should.be.eql([
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        29,
        31,
        37,
        41,
        43,
        47,
        53,
        59,
        61,
        67,
        71,
        73,
        79,
        83,
        89,
        97,
        101
      ]);
    });
  });

  describe('#performance', () => {
    it('should generate primes until 1,000,000 (=78498 primes) in less that 1 second', () => {
      // 1 M = 75/80 ms (78498 primes)
      // 10 M = 730 ms (664579 primes)
      // 100 M = 11756 ms (5761455 primes)
      // > 100 M = FATAL ERROR: JavaScript heap out of memory
      const limit = 1000000;
      var hrStart = process.hrtime();
      const primesArray = primes.findPrimes(limit);
      const hrtime = process.hrtime(hrStart);
      const executionTimeMs = hrtime[0] * 1000 + hrtime[1] / 1000000;
      console.log(`Up to ${limit}: ${primesArray.length} primes found in ${executionTimeMs} ms.`);
      // executionTimeMs.should.be.lessThan(1000);
      // console.log("last 10 primes:", primes.slice(primes.length - 10));
    }).timeout(20000);

  });
});
