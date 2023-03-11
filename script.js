const flagMap = {
    USD: "img/us-flag.gif",
    EUR: "img/eu-flag.png",
    JPY: "img/ja-flag.gif",
    GBP: "img/gb-flag.gif",
};

async function getRate(currency, side) {
    return await fetch(`http://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Error ${response.status}`);
            }
        })
        .then(data => {
            let rate = parseFloat(data.rates[0].mid);
            if (side) {
                rate = 1 / rate;
            }
            return rate;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

async function inputChanged(side) {
    let input;
    let output;
    if (side) {
        input = document.getElementById("left");
        output = document.getElementById("right");
    } else {
        output = document.getElementById("left");
        input = document.getElementById("right");
    }
    rotate(side);
    let rate = await getRate(document.getElementById("toCurrency").value, side);
    val = parseFloat(input.value);
    console.log(rate, val);
    result = Number(val * rate);
    console.log(result);
    output.value = result.toFixed(2);
}


let isRight = true;

function rotate(side) {
    let arrow = document.querySelector(".arrow");
    if (side != isRight) {
        arrow.classList.toggle("rotated");
        isRight = side;
    }
}

function setFlag() {
    const currency = document.getElementById("toCurrency").value;
    const flag = flagMap[currency];
    const flagImg = document.getElementById("flag");
    flagImg.src = flag;
    inputChanged(isRight);
}