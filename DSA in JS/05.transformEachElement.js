// LC 2635: Apply Transform over each element of an array
// Given an integer array arr and a mapping function fn, return a new array 
// with a transformation applied to each element.
// The returned array should be created such that returnedArray[i] = fn(arr[i], i).
// Please solve it without the built-in Array.map method.

function map(arr, fn){
    const result = [];
    for (let i =0; i < arr.length; i++){
        result.push(fn(arr[i], i));
    }
    return result;
}


// Test Cases:
// Case 1: 
function plusone(n){
    return n + 1;
}

// Case 2:
function plusI(n, i){
    return n + i;
}

// Case 3:
function constant(){
    return 37;
}
