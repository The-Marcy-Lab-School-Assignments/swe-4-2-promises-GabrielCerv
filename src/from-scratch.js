const resolvedWrapper = (value) => {
  return Promise.resolve(value);
};

const rejectedWrapper = (errorMessage) => {
  const newError = new Error(errorMessage);
  return Promise.reject(newError);
};

const handleResolvedPromise = (promise) => {
  return promise.then((value) => {
    console.log(value);
    return value.toUpperCase();
  }
  )
};

const handleResolvedOrRejectedPromise = (promise) => {
  return promise.then((value) => {
    console.log(value);
    return value.toUpperCase();
  })
    .catch((value) => {
      console.error(`Your error message was: ${value.message}`);
      return null;
    });

};

const pauseForMs = (ms) => {

  console.log('Starting...');
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  });
}

module.exports = {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
};
