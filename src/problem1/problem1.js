var sum_to_n_a = function(n) {
    let sum = 0;
    let length = n.length;
    for (var x=0; x < length; x++) {
        sum += n[x];
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // your code here
    let sum = 0;
    n.forEach((num)=> {
        sum += num;
    });

    return sum;
};

var sum_to_n_c = function(n) {
    // your code here
    let sum = 0;
    for (let x of n) {
        sum += x;
    }

    return sum;
};