var sum_to_n_a = function(n) {
    let sum = 0;
    for (var x=1; x <= n; x++) {
        sum += x;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // your code here
    var res = (n * (n+1)) / 2;

    return res;
};

var sum_to_n_c = function(n) {
    // your code here
    if (n <= 1) {
        return n;
    }
    return n + sum_to_n_c(n-1);
};

