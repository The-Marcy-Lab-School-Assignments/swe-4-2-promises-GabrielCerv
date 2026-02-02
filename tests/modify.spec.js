const path = require('path');
const ScoreCounter = require('score-tests');
const {
  readFileSequentially,
  readFilesParallel,
} = require('../src/modify');

const testSuiteName = 'Modify Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const logError = jest.spyOn(console, 'error').mockImplementation(() => { });

const expectedStory = `Once upon a time, in a land of ones and zeros, there lived a young programmer named Alex.
Alex had a problem: their code was full of callbacks nested inside callbacks, spiraling deeper and deeper into chaos.
One day, Alex discovered Promises. "I promise to resolve your callback hell," the Promise said with a smile.
And so, with .then() and .catch(), Alex's code became flat, readable, and lived happily ever after. The End.`;

describe(testSuiteName, () => {
  afterEach(() => {
    console.error.mockClear();
    jest.clearAllMocks();
    return new Promise(setImmediate);
  });

  describe('readFileSequentially', () => {
    it('returns a promise', () => {
      const result = readFileSequentially();
      expect(typeof result.then).toBe('function');

      scoreCounter.correct(expect); // DO NOT TOUCH
      return result; // clean up the promise
    });

    it('resolves to the complete story with all 4 parts joined by newlines', async () => {
      const story = await readFileSequentially();
      expect(story).toBe(expectedStory);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('reads files in sequential order (part1, then part2, then part3, then part4)', async () => {
      const fs = require('fs/promises');
      const readFileSpy = jest.spyOn(fs, 'readFile');

      await readFileSequentially();

      // Check that readFile was called 4 times
      expect(readFileSpy).toHaveBeenCalledTimes(4);

      // Check the order of calls
      const calls = readFileSpy.mock.calls;
      expect(calls[0][0]).toContain('story-part-1.txt');
      expect(calls[1][0]).toContain('story-part-2.txt');
      expect(calls[2][0]).toContain('story-part-3.txt');
      expect(calls[3][0]).toContain('story-part-4.txt');

      readFileSpy.mockRestore();
      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('handles errors with .catch() and logs them', async () => {
      const fs = require('fs/promises');
      const originalReadFile = fs.readFile;

      // Mock readFile to reject
      fs.readFile = jest.fn().mockRejectedValue(new Error('File not found'));

      await readFileSequentially();

      expect(logError).toHaveBeenCalled();

      // Restore original
      fs.readFile = originalReadFile;
      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  describe('readFilesParallel', () => {
    it('returns a promise', () => {
      const result = readFilesParallel();
      expect(typeof result.then).toBe('function');

      scoreCounter.correct(expect); // DO NOT TOUCH
      return result; // clean up the promise
    });

    it('resolves to the complete story with all 4 parts joined by newlines', async () => {
      const story = await readFilesParallel();
      expect(story).toBe(expectedStory);

      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('uses Promise.all to read files in parallel', async () => {
      const promiseAllSpy = jest.spyOn(Promise, 'all');

      await readFilesParallel();

      expect(promiseAllSpy).toHaveBeenCalled();
      // Check that it was called with an array of 4 promises
      const callArg = promiseAllSpy.mock.calls[0][0];
      expect(Array.isArray(callArg)).toBe(true);
      expect(callArg.length).toBe(4);

      promiseAllSpy.mockRestore();
      scoreCounter.correct(expect); // DO NOT TOUCH
    });

    it('handles errors with .catch() and logs them', async () => {
      const fs = require('fs/promises');
      const originalReadFile = fs.readFile;

      // Mock readFile to reject
      fs.readFile = jest.fn().mockRejectedValue(new Error('File not found'));

      await readFilesParallel();

      expect(logError).toHaveBeenCalled();

      // Restore original
      fs.readFile = originalReadFile;
      scoreCounter.correct(expect); // DO NOT TOUCH
    });
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
