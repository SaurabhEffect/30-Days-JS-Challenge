//LC 2623: Memoize
// Given a function fn, return a memoized version that caches results for previously seen inputs, 
// so fn is not called again for the same arguments.
// Possible functions:
// sum(a, b) → a + b; (a,b) and (b,a) are treated as different inputs.
// fib(n) → 1 if n ≤ 1, otherwise fib(n-1) + fib(n-2).
// factorial(n) → 1 if n ≤ 1, otherwise factorial(n-1) × n

function memoize(fn) {
  const cache = new Map();
  let callCount = 0;
  const memoized = function(...args) {
    let current = cache;
    for (const arg of args) {
      if (!current.has(arg)) current.set(arg, new Map());
      current = current.get(arg);
    }
    if (current.has('value')) return current.get('value');

    const result = fn(...args);
    current.set('value', result);
    callCount++;
    return result;
  };

  memoized.getCallCount = () => callCount;
  return memoized;
}

// Test Cases:
// Case 1:
const sum = (a, b) => a + b;

// Case 2:
const factorial = (n) => (n <= 1) ? 1 : (n * factorial(n - 1));

// Case 3:
const fib = (n) => (n <= 1) ? 1 : fib(n - 1) + fib(n - 2);