// LC 2629: Function Composition
// Given an array of functions [f1, f2, ..., fn], return their composition function.
// For [f(x), g(x), h(x)]: fn(x) = f(g(h(x)))
// If the array is empty, return the identity function: fn(x) = x
// Each function takes one integer and returns one integer.

function compose(functions) {
    return function(x){
        return functions.reduceRight((acc,fn) => fn(acc), x)
    };
}