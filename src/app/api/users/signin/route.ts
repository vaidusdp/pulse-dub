import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"  

export async function POST(req: NextRequest){
    try {
        const {email, password} = await req.json();

        if ([email, password].some(field => field.trim() === "")) {
            return NextResponse.json(
                {
                    error: "All fields are required" 
                },
                {
                    status: 401
                }
            );
        }
    
        const user = await prisma.user.findUnique({
            where: {email}
        });
    
        if(!user){
            return NextResponse.json(
                {
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        };
    
        const isPassValid = await bcrypt.compare(password, user.password);
        if(!isPassValid){
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }
    
        const tokenData = {
            id: user.id,
            email: user.email
        };
    
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET! as string, {expiresIn: "1d"});
    
        const response = NextResponse.json({
            message: "Login Successful",
        })
    
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });
    
        return response;
    } catch (error:any) {
        console.error("Login API Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}