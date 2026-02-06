# Short Response Questions

## Question 1: Promise States

What are the three states of a Promise? For each state, explain what it represents and which Promise method (`.then()` or `.catch()`) is used to handle it.

**Your Answer:**

The three states of a Promise are pending, resolved, and rejected.

Pending - does not run on neither `.then()` or `.catch()`, technically it is waiting so both are not being called to handle. This tends to be because the pending state is normally asynchronous code which waits until the entirety of the synchronous code is executed. 

Resolved - is when the code/operation has succeeded in its results, it utilizes `.then()` to assist with the success values of the code/operations.

Rejected- is when the code/operations has failed. Resulting in a error which uses `.catch()` to judge this decision and executes with an final error value.




## Question 2: Callback Hell vs. Promise Chaining

Explain why deeply nested callbacks (callback hell) are problematic, and describe how Promise chaining with `.then()` solves this problem.

**Your Answer:**

Deeply nested callbacks (callback hell) are problematic because they are horrible for interpreting code, lacks in readability causing "The Pyramid of Doom" forcing more work onto a developer. Promise Chaining with `.then()` assists with your code readability by chaining the 

## Question 3: Error Handling with `.catch()`

If you have a chain of three `.then()` calls followed by a single `.catch()`, and the second `.then()` throws an error, what happens? Why is this behavior useful?

**Your Answer:**



