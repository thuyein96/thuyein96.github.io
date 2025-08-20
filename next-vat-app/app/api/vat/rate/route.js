export async function GET(request) {
    const rate = 0.07;
    return Response.json({ rate });
}