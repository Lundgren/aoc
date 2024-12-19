module.exports.memoize = function memoize(fn) {
  const cache = {};
  return (...args) => {
    const str = args.join(",");
    if (cache[str]) {
      return cache[str];
    }
    const result = fn(...args);
    cache[str] = result;
    return result;
  };
};
