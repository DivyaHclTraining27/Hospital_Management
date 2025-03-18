import { connectToDB } from "@/lib/mongodb";
import Health from "@/models/health";
import { NextRequest, NextResponse } from "next/server";

/**
 * delete the quiz questions based on _id
 * @param request NextRequest
 * @param param1 params
 * @returns 
 */

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }

) {
    await connectToDB();
    const { userId } = await params;
    try {
        const healthData = await Health.find({ userId: userId }); // Query health data based on user ID
        return NextResponse.json({ success: true, message: 'Health data retrieved successfully', data: healthData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to retrieve data', data: error }, { status: 500 });
    }

}

/**
 * add health details based on user ID
 */

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    await connectToDB();
    const { userId } = await params;
    const healthDetails = await request.json(); // Assuming healthDetails is sent in the request body
    console.log('healthDetails', healthDetails)
    try {
        const newHealthData = new Health({ userId, ...healthDetails });
        await newHealthData.save(); // Save the new health data
        return NextResponse.json({ success: true, message: 'Health data added successfully', data: newHealthData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to add data', data: error }, { status: 500 });
    }
}