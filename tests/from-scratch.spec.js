const path = require('path');
const ScoreCounter = require('score-tests');
const {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
} = require('../src/from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => { });
const logError = jest.spyOn(console, 'error').mockImplementation(() => { });

const returnRandomString = () => Math.random().toString(36).substring(7);

describe(testSuiteName, () => {
  afterEach(() => {
    console.log.mockClear();
    console.error.mockClear();
    jest.clearAllMocks();
    return new Promise(setImmediate);
  });

  describe('resolvedWrapper', () => {
    it('returns a promise that resolves to the value passed in', async () => {
      const randomValue = `Your random string: ${returnRandomString()}`;

      await expect(resolvedWrapper(randomValue)).resolves.toBe(randomValue);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('works with different types of values', async () => {
      await expect(resolvedWrapper(42)).resolves.toBe(42);
      await expect(resolvedWrapper(null)).resolves.toBe(null);
      await expect(resolvedWrapper({ key: 'value' })).resolves.toEqual({ key: 'value' });

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('rejectedWrapper', () => {
    it('returns a rejected promise', async () => {
      const randomValue = `Your random string: ${returnRandomString()}`;

      await expect(rejectedWrapper(randomValue)).rejects.toBeTruthy();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('rejects with an Error object containing the message', async () => {
      const randomValue = `Your random string: ${returnRandomString()}`;
      const rejectedValue = rejectedWrapper(randomValue);

      await expect(rejectedValue).rejects.toBeInstanceOf(Error);
      await expect(rejectedValue).rejects.toHaveProperty('message', randomValue);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('handleResolvedPromise', () => {
    it('logs the resolved value and returns a promise with the uppercase value', async () => {
      const randomValue = `Your random string: ${returnRandomString()}`;
      const resolvedPromise = Promise.resolve(randomValue);

      await handleResolvedPromise(resolvedPromise)
        .then((value) => {
          expect(log).toHaveBeenCalledWith(randomValue);
          expect(value).toBe(randomValue.toUpperCase());

          scoreCounter.correct(expect); // DO NOT TOUCH
        });
    });

    it('uses .then() to handle the promise (not await)', async () => {
      const resolvedPromise = Promise.resolve('test');
      const result = handleResolvedPromise(resolvedPromise);

      // Should return a promise immediately (not use await)
      expect(result).toBeInstanceOf(Promise);

      await result;
      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('handleResolvedOrRejectedPromise', () => {
    it('handles resolved promises the same as handleResolvedPromise', async () => {
      const randomValue = `Your handleResolvedOrRejectedPromise value: ${returnRandomString()}`;
      const resolvedPromise = Promise.resolve(randomValue);

      await handleResolvedOrRejectedPromise(resolvedPromise)
        .then((value) => {
          expect(log).toHaveBeenCalledWith(randomValue);
          expect(value).toBe(randomValue.toUpperCase());

          scoreCounter.correct(expect); // DO NOT TOUCH
        });
    });

    it('catches rejected promises, logs error message, and returns null', async () => {
      const randomValue = `Your random error: ${returnRandomString()}`;
      const expectedErrorLog = `Your error message was: ${randomValue}`;

      const getRejectedPromise = () => Promise.reject(new Error(randomValue));

      await handleResolvedOrRejectedPromise(getRejectedPromise())
        .then((value) => {
          expect(value).toBeNull();
          expect(logError).toHaveBeenCalledWith(expectedErrorLog);
          scoreCounter.correct(expect); // DO NOT TOUCH
        })
        .catch((err) => {
          // Should not reach here - the function should catch and return null
          expect(err).toBeNull();
        });
    });
  });

  describe('pauseForMs', () => {
    it('returns a promise that resolves to undefined', async () => {
      await expect(pauseForMs(100)).resolves.toBeUndefined();

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('calls setTimeout with the passed in milliseconds', async () => {
      const ms = 100;
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

      await pauseForMs(ms);
      expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), ms);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('resolves after the specified time has passed', async () => {
      const ms = 500;

      const startTime = Date.now();
      await pauseForMs(ms)
        .then(() => {
          const endTime = Date.now();
          const timeDiff = endTime - startTime;
          expect(timeDiff).toBeGreaterThanOrEqual(ms - 50);
          expect(timeDiff).toBeLessThan(ms + 100);

          scoreCounter.correct(expect); // DO NOT TOUCH
        })
        .catch((err) => {
          expect(err).toBeNull();
        });
    });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
