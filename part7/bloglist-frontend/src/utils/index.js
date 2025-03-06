export const resetUseInputs = (...args) => {
  return args.forEach(input => input.reset())
}