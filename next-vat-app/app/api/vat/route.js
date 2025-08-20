export async function GET(request) {
    const rate = 0.07;
    const { searchParams } = new URL(request.url);
    const amount = parseFloat(searchParams.get('amount'));
    let vat = null;

    if (!isNaN(amount)) {
        vat = amount * rate;
        return Response.json({ rate, amount, vat });
    } else {
        return Response.json({ rate, error: "Invalid amount" });
    }

}

export async function POST(request) {
    const { amount } = await request.json();
    const rate = 0.07;
    if(isNaN(amount)) {
        return new Response(JSON.stringify({error: "Invalid amount"}), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const vat = (amount * rate).toFixed(2);
    return new Response(
        JSON.stringify({ amount, vat }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}