// LC 2666: Allow one function call
//Given a function fn, return a new function that can call fn only once.
// First call → returns fn's result.
// Subsequent calls → return undefined.

function once(fn){
    let called = false;
    let result;
    return function(...args){
        if(!called){
            called = true;
            result = fn(...args);
            return result;
        }
        else return undefined;
    };
}

// Test Case:
function add(a,b){
    return a+ b;
}