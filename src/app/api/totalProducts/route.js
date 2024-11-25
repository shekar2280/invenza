import { NextResponse } from 'next/server';
import { Product } from "@/app/lib/models";
import { connectToDB } from '@/app/lib/utils';

export async function GET() {
  await connectToDB();

  try {
    const currentProductCount = await Product.countDocuments();

    const previousProductCount = await Product.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    const productChange = previousProductCount > 0
      ? ((currentProductCount - previousProductCount) / previousProductCount) * 100
      : currentProductCount > 0
      ? 100
      : 0;

    return NextResponse.json({
      currentProductCount,
      productChange: productChange.toFixed(2), // Return as a string to ensure consistency
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json({ error: "Failed to fetch product data" }, { status: 500 });
  }
}
