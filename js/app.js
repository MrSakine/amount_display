const priceElement = document.getElementById('product');
const quantityElement = document.getElementById('number');
let purchases = [];
let tmp = [];
const shippingFees = [{
    free: {
        price: 3000,
        fee: 0
    },
    medium: {
        price: 2000,
        fee: 250
    },
    low: {
        price: 2000,
        fee: 500
    }
}];
const products = [{
        id: 1,
        name: 'Original Blend 200g ¥500',
        price: 500
    },
    {
        id: 2,
        name: 'Original Blend 500g ¥900',
        price: 900
    },
    {
        id: 3,
        name: 'Special Blend 200g ¥700',
        price: 700
    },
    {
        id: 4,
        name: 'Special Blend 500g ¥1200',
        price: 1200
    }
]

function calc() {
    if (priceElement.value == 0) {
        window.alert('Choose a product');
    } else if (quantityElement.value == 0) {
        window.alert('Choose a quantity');
    } else {
        if (purchases.length <= 0) {
            setupData();
        }

        let sum = subtotal();
        let shippingFee = calcPostageFromPurchase(sum);
        let response = display();
        response += "\n\n";
        response += `Shipping fee = ${shippingFee}\nSubtotal = ${sum}\nTotal price = ${sum + shippingFee}`;

        window.alert(response);
        purchases = [];
        priceElement.value = '0';
        quantityElement.value = '0';
    }
}

function add() {
    setupData();
    window.alert(display());
}

function subtotal() {
    return purchases.reduce((prev, purchase) => { return prev + purchase.price * purchase.quantity }, 0);
}

function display() {
    let string = purchases.map(purchase => { return `Product = ${purchase.text}, Price = ${purchase.price}, Quantity = ${purchase.quantity}`; }).join('\n');
    return string;
}

function calcPostageFromPurchase(sum) {
    let shippingFee = 0;

    for (const s of shippingFees) {
        if (sum < s.low.price) {
            shippingFee = s.low.fee;
        } else if (sum > s.medium.price && sum < s.free.price) {
            shippingFee = s.medium.fee;
        } else {
            shippingFee = s.free.fee;
        }
    }

    return shippingFee;
}

function setupData() {
    const price = parseInt(priceElement.value);
    const number = parseInt(quantityElement.value);
    let option = products.filter(item => item.id === price)[0];
    const purchase = {
        id: price,
        quantity: number,
        price: option.price,
        text: option.name.slice(0, option.name.indexOf('0g') + 1)
    };

    let newPurchase = purchases.findIndex(item => item.price === purchase.price);

    if (purchases.length <= 0 || newPurchase === -1) {
        purchases.push(purchase);
    } else {
        purchases[newPurchase].number += purchase.number;
    }
}