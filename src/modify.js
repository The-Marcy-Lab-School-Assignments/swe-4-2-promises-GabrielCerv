const fs = require('fs/promises');
const path = require('path');

// Helper to get the correct path to data files
const getPath = (filename) => path.join(__dirname, 'data', filename);

/*
CALLBACK HELL EXAMPLE - Don't modify this function!

This is what reading 4 files looks like with nested callbacks.
Notice how the code keeps indenting further and further right.
This is hard to read, hard to debug, and hard to maintain.
*/
const fsCallback = require('fs');
const getStoryCallbackHell = (callback) => {
  fsCallback.readFile(getPath('story-part-1.txt'), 'utf-8', (err, part1) => {
    if (err) { console.error(err); return; }
    fsCallback.readFile(getPath('story-part-2.txt'), 'utf-8', (err, part2) => {
      if (err) { console.error(err); return; }
      fsCallback.readFile(getPath('story-part-3.txt'), 'utf-8', (err, part3) => {
        if (err) { console.error(err); return; }
        fsCallback.readFile(getPath('story-part-4.txt'), 'utf-8', (err, part4) => {
          if (err) { console.error(err); return; }
          const story = [part1, part2, part3, part4].join('\n');
          callback(story);
        });
      });
    });
  });
};


// TODO: Rewrite using promise chaining - read files sequentially
// Hints:
// - fs.readFile(path, 'utf-8') returns a promise that resolves to the file contents
// - Use the storyParts array to collect each part as you read it
// - Each .then() should: read the next file, push to storyParts, return the next read
// - The final .then() should join and return the complete story
// - Don't forget .catch() for error handling!
const readFileSequentially = () => {
  const storyParts = [];
  return fs.readFile(getPath('story-part-1.txt'), 'utf-8')
    .then((part1) => {
    })
    .then((part2) => {
    })
    .then((part3) => {
    })
    .then((part4) => {
    })
    .catch((err) => {
      console.error(err);
    });
};

// TODO: Rewrite using Promise.all - read all files in parallel
// Hints:
// - Promise.all([promise1, promise2, ...]) waits for ALL promises to resolve
// - It returns an array of results in the SAME ORDER as the input promises
// - Use .then() to join the parts after Promise.all resolves
// - Don't forget .catch() for error handling!
const readFilesParallel = () => {
};

module.exports = {
  getPath,
  readFileSequentially,
  readFilesParallel,
};
