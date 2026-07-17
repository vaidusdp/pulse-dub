import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const response = NextResponse.json(
            {
                message: "Logged Out Successfully"
            },
            {
                status: 200
            }
        );

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (error:any) {
        console.log("Log Out Failed!");
        return NextResponse.json(
            {
                message: error.message
            },
            {
                status: 500
            }
        )
    }
}