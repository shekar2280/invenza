import { connectToDB } from "@/app/lib/utils";
import { Transaction } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  try {
    const latestTransactions = await Transaction.find()
      .sort({ date: -1 }) // Sort by date in descending order to get the latest
      .limit(5); // Limit to the latest 3 transactions

    return NextResponse.json(latestTransactions);
  } catch (error) {
    console.error("Error fetching latest transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest transactions" },
      { status: 500 }
    );
  }
}
