export async function GET(request, { params }) {
    const amount = parseFloat(params.amount);
    if (isNaN(amount)) {
        return new Response(JSON.stringify({ error: 'Invalid amount' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const vatRate = 0.07; // 7% VAT
    const vat = +(amount * vatRate).toFixed(2);
    const total = +(amount + vat).toFixed(2);

    return new Response(
        JSON.stringify({ amount, vat, total }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}