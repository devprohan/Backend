//  Error Handeling For The Handeler Functiom
//  By Using Promise
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
    .resolve(requestHandler(req, res, next))
    .catch((err) => next(err));
  };
};

export { asyncHandler };


// const asynchandler = (func) => {() => {}} only braces remove
/*
      By Using Try-Catch
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};
*/
