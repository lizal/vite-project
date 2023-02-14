let denounceTimer: ReturnType<typeof setTimeout>;
const denounce = (fn, wait: number = 100) => {
  return function () {
      let args = arguments
      clearTimeout(denounceTimer);
      denounceTimer = setTimeout(function () {
          fn.apply(this, args)
      }, wait)
  }
}

export {
  denounce
}