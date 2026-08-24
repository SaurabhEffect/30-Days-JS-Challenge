// LC 2665: Counter II
// Write a function createCounter. It should accept an initial integer init. 
// It should return an object with three functions.
// The three functions are:
// increment(): increases the current value by 1 and then returns it.
// decrement(): reduces the current value by 1 and then returns it.
// reset(): sets the current value to init and then returns it.

function createCounter(init){
    let value = init;           //IMP: Here we haven't used const we want to change it.
    return{
        increment : function (){
            value +=1;
            return value;
        },
        decrement : function(){
            value -=1;
            return value;
        },
        reset: function(){
            value = init;
            return value;
        }
    };
}
 