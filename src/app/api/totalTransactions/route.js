import { NextResponse } from 'next/server';
import { Transaction } from "@/app/lib/models";  
import { connectToDB } from '@/app/lib/utils';

export async function GET() {
  await connectToDB();

  try {
    
    const currentTransactionCount = await Transaction.countDocuments();

    
    const previousTransactionCount = await Transaction.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    
    const transactionChange = previousTransactionCount > 0
      ? ((currentTransactionCount - previousTransactionCount) / previousTransactionCount) * 100
      : currentTransactionCount > 0
      ? 100
      : 0;

    return NextResponse.json({
      currentTransactionCount,
      transactionChange: transactionChange.toFixed(2),  
    });
  } catch (error) {
    console.error("Error fetching transaction data:", error);
    return NextResponse.json({ error: "Failed to fetch transaction data" }, { status: 500 });
  }
}
