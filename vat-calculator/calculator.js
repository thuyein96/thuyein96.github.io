function calculate() {
    const basePrice = parseFloat($("#basePrice").val());
    console.log("Price before VAT: " + basePrice);

    const vatRate = 0.07;
    console.log("VAT Rate: " + vatRate);

    const vat = basePrice * vatRate;
    const priceAfterVAT = basePrice + vat;
    console.log("Price after VAT: " + priceAfterVAT);

    $("#result").html(`
        <p>Base Price: $${basePrice.toFixed(2)}</p>
        <p>VAT Rate: ${(vatRate * 100).toFixed(2)}%</p>
        <p>VAT: $${vat.toFixed(2)}</p>
        <p>Price after VAT: $${priceAfterVAT.toFixed(2)}</p>
    `);
}


function calculateWithVAT() {
    const totalPrice = parseFloat($("#priceWithVAT").val());
    console.log("Total Price: " + totalPrice);

    const vatRate = 0.07;
    console.log("VAT Rate: " + vatRate);
    

    const basePrice = totalPrice / (1 + vatRate);
    console.log("Price without VAT: " + basePrice);

    const vat = totalPrice - basePrice;
    console.log("VAT: " + vat);

    $("#resultWithoutVAT").html(`
        <p>Total Price: $${totalPrice.toFixed(2)}</p>
        <p>VAT Rate: ${vat.toFixed(2)}%</p>
        <p>Price without VAT: $${basePrice.toFixed(2)}</p>
    `);
}

