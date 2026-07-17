import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest){
    try {
        const token = req.cookies.get("token")?.value;
    
        if(!token){
            return NextResponse.json(
                {
                    message: "Unauthorized Access"
                },
                {
                    status: 400
                }
            )
        };
    
        const decodedToken = jwt.verify(
            token,
            process.env.TOKEN_SECRET! as string
        ) as {
            id: string,
            email: string
        };
    
        const user = await prisma.user.findUnique({
            where: {
                id: decodedToken.id
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true
            }
        });
        
        if(!user){
            return NextResponse.json(
                {
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
    
        return NextResponse.json(
          {
            message: "User fetched successfully",
            user,
          },
          {
            status: 200,
          }
        );
    } catch (error:any) {
        return NextResponse.json(
            {
                message: error.message || "Unable To Fetch User Details"
            },
            {
                status: 500
            }
        )
    }
}