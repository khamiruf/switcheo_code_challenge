// your code here:
// price.mid() returns the mid-point value between price.buy and price.sell.
class Price {
    constructor(buy, sell, pair) {
        this.buy = buy;
        this.sell = sell;
        this.pair = pair;
    }

    mid() {
        return (this.buy + this.sell) / 2;
    }

    quote() {
        return this.pair.substr(-3);    
    }
}

class Datasource {
    async getPrices() {
        try {
            const response = await fetch("https://static.ngnrs.io/test/prices");
            const data = await response.json();
            let prices = data["data"];
            let output = prices["prices"].map((price) => {
                return new Price(price.buy, price.sell, price.pair);
            });
            return output;
        } catch (err) {
            console.log(err);
        }
    }
}

// driving code
ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`);
        });
    }).catch(error => {
        console.error(error);
    });