# Promises

- [Reminders](#reminders)
- [Setup](#setup)
- [Short Responses](#short-responses)
- [From Scratch Questions](#from-scratch-questions)
  - [Question 1: resolvedWrapper](#question-1-resolvedwrapper)
  - [Question 2: rejectedWrapper](#question-2-rejectedwrapper)
  - [Question 3: handleResolvedPromise](#question-3-handleresolvedpromise)
  - [Question 4: handleResolvedOrRejectedPromise](#question-4-handleresolvedorrejectedpromise)
  - [Question 5: pauseForMs](#question-5-pauseforms)
- [Modify Questions](#modify-questions)
  - [Question 6: readFileSequentially](#question-6-readfilesequentially)
  - [Question 7: readFilesParallel](#question-7-readfilesparallel)
- [Bonus](#bonus)

## Reminders

**<details><summary>Asking ChatGPT for Help</summary>**

If you're stuck, you may use ChatGPT to clarify the assignment — but not to solve it for you. To do this, copy the meta-prompt below into ChatGPT along with the assignment question.

> You are acting as a tutor. Your job is to explain what this coding question is asking, clarify confusing wording, and highlight the relevant concepts students need to know — but do not provide the full solution or code that directly answers the question. Instead, focus on rephrasing the problem in simpler terms, identifying what's being tested, and suggesting what steps or thought processes might help. Ask guiding questions to ensure the student is thinking critically. Do not write the final function, algorithm, or code implementation.

Be mindful of your AI usage on assignments. AI can be a great tool to help your learning but it can also be detrimental if you let it do too much of the thinking for you.

</details>

**<details><summary>Be Okay With Being "Provisionally Complete"</summary>**

At Marcy, we will deem an assignment as "complete" if you satisfy the requirements listed below.

However, we know many of you will feel the urge to hold off on submitting until your assignment feels 100% perfect. That drive for excellence is an asset!

But perfectionism can also get in the way of learning — especially when we need to cover a lot in a short amount of time.

That's why we encourage you to be comfortable with being **"provisionally complete."** This means:

- Submitting your work even if it isn't perfect yet
- Treating submission as a checkpoint, not a finish line
- Committing to return, revise, and improve later

Learning to move forward with provisional completeness will help you make steady progress while still building the habit of continuous improvement.

</details>

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy Lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/how-tos/working-with-assignments#how-to-work-on-assignments).

Files to modify are found in the `src/` directory:
- `from-scratch.js`
- `modify.js`
- `short-response.md`

Here are some useful commands:

```sh
git checkout -b draft   # switch to the draft branch before starting

git add -A              # add a changed file to the staging area
git commit -m 'message' # create a commit with the changes
git push                # push the new commit to the remote repo
```

When you are finished, create a pull request and tag your instructor for review.

### npm test

Before submitting your code, make sure you got things right by running the provided automated tests.

You can do this using the commands:

```sh
npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change
```

You will know that you have "completed" an assignment once you have passed 75% or more of the automated tests!

## Short Responses

Answer the 3 questions in `src/short-response.md`. Each question is worth 6 points (3 points for writing, 3 points for technical content).

Topics:
1. Promise states and which methods handle them
2. Callback Hell vs. Promise Chaining
3. Error Handling with `.catch()`

## From Scratch Questions

These questions build your understanding of Promises from the ground up. Complete them in order — each one builds on the previous concepts.

### Question 1: resolvedWrapper

Before we can handle promises, we need to understand how to create them. The simplest way is using `Promise.resolve(value)` which creates a promise that immediately resolves to the given value.

Write a function `resolvedWrapper` that takes in any `value` and returns a promise that resolves to that value.

```js
resolvedWrapper(10);
// Returns: Promise { 10 }

resolvedWrapper('hello');
// Returns: Promise { 'hello' }

resolvedWrapper('hello').then(console.log);
// Logs: hello
```

### Question 2: rejectedWrapper

The flip side of resolving is rejecting. When something goes wrong, promises reject with an error. Use `Promise.reject(error)` to create a promise that immediately rejects.

Write a function `rejectedWrapper` that takes in an `errorMessage` string, creates a new `Error` object with that message, and returns a promise that rejects with that error.

```js
rejectedWrapper('Something went wrong')
  .catch((err) => {
    console.log(err.message);
    // Logs: Something went wrong
  });
```

Why reject with an `Error` object instead of just a string? It's best practice! Error objects include a stack trace that helps with debugging.

### Question 3: handleResolvedPromise

Now let's handle promises that already exist. The `.then()` method lets you specify what to do when a promise resolves. Key facts:
- `.then()` takes a callback that receives the resolved value
- `.then()` returns a new promise with whatever the callback returns

Write a function `handleResolvedPromise` that takes in a promise (which will always resolve to a string `message`) and:
1. Uses `.then()` to log the message with `console.log`
2. Returns a new promise that resolves to the message in UPPERCASE

```js
const greetingPromise = Promise.resolve('hello world');

const loudPromise = handleResolvedPromise(greetingPromise);
// Logs: hello world

loudPromise.then(console.log);
// Logs: HELLO WORLD
```

**Hint:** Don't create a new promise with `new Promise()`. Instead, take advantage of the fact that `.then()` returns a promise — just return the uppercase string from your callback!

### Question 4: handleResolvedOrRejectedPromise

Real-world promises can fail. The `.catch()` method handles rejections, similar to how `try/catch` works with synchronous code.

Write a function `handleResolvedOrRejectedPromise` that takes in a promise and:

**If the promise resolves:**
- Log the message with `console.log`
- Return a promise that resolves to the message in UPPERCASE (same as before)

**If the promise rejects:**
- Log the error using `console.error` with the format: `"Your error message was: [error's message]"`
- Return a promise that resolves to `null` (so the chain can continue safely)

```js
handleResolvedOrRejectedPromise(Promise.resolve('success'))
  .then(console.log);
// Logs: success
// Then logs: SUCCESS

handleResolvedOrRejectedPromise(Promise.reject(new Error('oops')))
  .then(console.log);
// Logs (via console.error): Your error message was: oops
// Then logs: null
```

### Question 5: pauseForMs

`setTimeout` is asynchronous but callback-based. Let's wrap it in a promise!

Write a function `pauseForMs` that takes a number of milliseconds and returns a promise that resolves after that time has passed. The promise doesn't need to resolve to any particular value — it just needs to resolve after the delay.

```js
console.log('Starting...');

pauseForMs(1000).then(() => {
  console.log('1 second has passed!');
});

// Logs "Starting..." immediately
// Then logs "1 second has passed!" after 1 second
```

**Hint:** You'll need to use `new Promise()` here. Call `setTimeout` inside the promise, and call `resolve()` when the timer fires.

## Modify Questions

These questions use `fs/promises` to read files. You've used callback-based `fs.readFile` before — now you'll use its promise-based version.

The `data/` folder contains a story split across four files. Your job is to read and combine them.

### Question 6: readFileSequentially

Look at the callback-based version in `modify.js`. It reads four files one after another using nested callbacks — this is **callback hell**:

```js
fs.readFile('data/story-part-1.txt', 'utf-8', (err, part1) => {
  if (err) { console.error(err); return; }
  fs.readFile('data/story-part-2.txt', 'utf-8', (err, part2) => {
    if (err) { console.error(err); return; }
    fs.readFile('data/story-part-3.txt', 'utf-8', (err, part3) => {
      if (err) { console.error(err); return; }
      fs.readFile('data/story-part-4.txt', 'utf-8', (err, part4) => {
        if (err) { console.error(err); return; }
        const story = [part1, part2, part3, part4].join('\n');
        callback(story);
      });
    });
  });
});
```

Your job: Rewrite `readFileSequentially` using promise chaining to flatten this structure. The function should:
1. Read all four story files in order (part 1, then 2, then 3, then 4)
2. Return a promise that resolves to the complete story (all parts joined with `'\n'`)
3. Use `.catch()` to handle any errors by logging them with `console.error`

```js
readFileSequentially().then(console.log);
// Logs the complete 4-part story
```

**Hint:** Use `fs.readFile` from `fs/promises` (already imported for you). Each `.then()` should read the next file and add to the `storyParts` array.

### Question 7: readFilesParallel

Reading files one-by-one works, but it's slow — each file waits for the previous one to finish. When the order of operations doesn't matter, we can read them all at once using `Promise.all()`.

`Promise.all()` takes an array of promises and returns a single promise that:
- Resolves to an array of all the resolved values (in the same order)
- Rejects if ANY of the promises reject

Write `readFilesParallel` that:
1. Reads all four story files at the same time using `Promise.all()`
2. Returns a promise that resolves to the complete story (all parts joined with `'\n'`)
3. Uses `.catch()` to handle errors

```js
readFilesParallel().then(console.log);
// Logs the same complete story, but faster!
```

**Think about it:** Why does this version still produce the story in the correct order, even though the files might finish loading in any order?

## Bonus

After you've gotten your tests passing and answered all your short answers, try researching `async/await`. **Don't use it on this assignment** (we want to see if you understand the fundamentals first), but it's a modern way of writing promises with the `async` and `await` keywords. We'll use them later this week, but you can start reading about them now to get a leg up!
