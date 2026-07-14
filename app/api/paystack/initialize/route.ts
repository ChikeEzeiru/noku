import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, amount, reference } = await req.json();

  if (!email || !amount || !reference) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, amount, reference }),
  });

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json({ error: data.message ?? "Paystack initialization failed" }, { status: 502 });
  }

  return NextResponse.json({ access_code: data.data.access_code, reference: data.data.reference });
}
