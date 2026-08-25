// LC 2626: Array Reduce Transformation
// Given an integer array nums, a reducer function fn, and an initial value init, 
// return the final value after applying fn sequentially to every element.
// val = fn(init, nums[0])
// val = fn(val, nums[1])
// ...
// If nums is empty, return init.
// Constraint: Solve without using the built-in Array.reduce().

function reduce(nums, fn, init){
    let val = init;
    for(let i =0; i< nums.length; i++){
        val = fn(val, nums[i]);
    }
    return val; 
}

// Test Cases
//Case 1: 
function sum(accum, curr) {
    return accum + curr; 
}

//Case 2:
function summ(accum, curr) {
    return accum + curr * curr; 
}
