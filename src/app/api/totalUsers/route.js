import { NextResponse } from 'next/server';
import { User } from "@/app/lib/models";  
import { connectToDB } from '@/app/lib/utils';

export async function GET() {
  await connectToDB();

  try {
    
    const currentUserCount = await User.countDocuments();

    
    const previousUserCount = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    
    const userChange = previousUserCount > 0
      ? ((currentUserCount - previousUserCount) / previousUserCount) * 100
      : currentUserCount > 0
      ? 100
      : 0;

    return NextResponse.json({
      currentUserCount,
      userChange: userChange.toFixed(2), 
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
