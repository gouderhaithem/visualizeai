// /app/api/stripe/route.ts
import { NextResponse } from "next/server";
import { checkoutCredits } from "@/lib/actions/transaction.action";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sessionUrl = await checkoutCredits(body);

    if (!sessionUrl) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: sessionUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
