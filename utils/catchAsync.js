// A Wrapper function to reduce the redundant try catch code block.
const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

module.exports = catchAsync;