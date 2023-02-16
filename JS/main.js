let discountP = document.querySelector(".yearlyBill span");
let discountB = document.querySelector(".discount button");
let ball = document.querySelector(".discount button .ball");
let discountChoise = false;
let smallScreen = false;
let month = document.querySelector(".month");
let priceSlider = document.querySelector("#price-slider");
let htmlPrice = document.querySelector(".price .num");
let views = document.querySelector('.views');

resizeWindow();

window.addEventListener("resize", () => {
    resizeWindow();
});

discountB.addEventListener("click", () => {
    if (discountChoise == false) {
        ball.style.left = 'calc(100% - 18px)';
        discountB.style.backgroundColor = 'var(--toggle-Cyan-Slider-hover)';
        month.textContent = "/ year";
        htmlPrice.textContent = `${getPriceYearly(priceSlider.value)[1].toFixed(2)}`;
        discountChoise = true;
    } else {
        ball.style.left = '4px';
        discountB.style.backgroundColor = 'var(--Light-Grayish-Blue-Toggle-Background)';
        month.textContent = "/ month";
        htmlPrice.textContent = `${getPrice(priceSlider.value)[1].toFixed(2)}`;
        discountChoise = false;
    }
});

priceSlider.addEventListener('change', () => {
    changeSliderBackGround(+priceSlider.value);
    if (discountChoise == true) {
        htmlPrice.textContent = `${getPriceYearly(priceSlider.value)[1].toFixed(2)}`;
    } else {
        htmlPrice.textContent = `${getPrice(priceSlider.value)[1].toFixed(2)}`;
    }
    views.textContent = getPrice(priceSlider.value)[0];
});

/* Functions */
function getPrice(val) {
    switch (+val) {
        case 0:
            return ['10K ', 8];
        case 1:
            return ['50k ', 12];
        case 2:
            return ['100k ', 16];
        case 3:
            return ['500k ', 24];
        case 4:
            return ['1M ', 36];
        default:
            return [-1, -1];
    }
}

function getPriceYearly(val) {
    let price = getPrice(val)[1] * 12;
    let total = price - (25 * price / 100);
    return [getPrice(val)[1], total];
}

function changeSliderBackGround(val) {
    val = val * 100 / 4;
    priceSlider.style.background = `linear-gradient(to right, var(--Soft-Cyan-Full-Slider-Bar) 0%, var(--Soft-Cyan-Full-Slider-Bar)
    ${val}%, var(--Light-Grayish-Blue-Empty-Slider-Bar)  ${val}%,var(--Light-Grayish-Blue-Empty-Slider-Bar) 100%)`;
}

function resizeWindow() {
    const top = document.querySelector(".top");
    if (window.innerWidth <= 500 && !smallScreen) {
        smallScreen = true;
    } else if (window.innerWidth > 500 && smallScreen) {
        discountP.textContent = "25% discount";
        smallScreen = false;
    }
}