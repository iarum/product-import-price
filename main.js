async function main() {
    let priceUSD = document.getElementById("price").value.replace(/[^0-9]/g, '');
    let kg = document.getElementById("cat").value;
    let results = document.getElementById("results");
    let ganbajeba = false;
    let transport = 9;

    // validation
    if (priceUSD < 0) priceUSD = 0;
    if (priceUSD > 1000000) priceUSD = 1000000;

    if (kg != 0) transport = 9 * kg;

    // get API rate
    let rate = await getCurrency();

    rate = parseFloat(rate.toFixed(2));
    let priceGel = parseFloat((priceUSD * rate).toFixed(2));
    let ganbajebaPrice = parseFloat((priceGel * 0.18).toFixed(2));

    if (priceGel >= 300) ganbajeba = true;

    results.innerHTML = `
        <div>${priceUSD}$ = ${priceGel}₾</div>
        <div>განბაჟება: ${ganbajeba ? "კი (" + ganbajebaPrice + "₾)" : "არა"}</div>
        <div>ტრანსპორტირება: ${transport}₾</div>
        <div>
            <strong>სულ: ${(priceGel + ganbajebaPrice + transport).toFixed(2)}₾</strong>
        </div>
    `;
}

async function getCurrency() {
    let url = "https://open.er-api.com/v6/latest/USD";

    try {
        let response = await fetch(url);
        let data = await response.json();
        return data.rates.GEL;
    } catch (e) {
        console.error("Error fetching currency:", e);
        return null;
    }
}

price.addEventListener("input", main);
cat.addEventListener("change", main);