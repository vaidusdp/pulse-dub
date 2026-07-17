import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest){
    try {
        const {name, email, password} = await req.json();

        if([name, email, password].some((field) => field.trim() === "")){
            return NextResponse.json(
                {
                    message: "Provide Details."
                },
                {
                    status: 409
                }
            )
        }
        
        const existedUser = await prisma.user.findUnique({
            where: {email}
        });
    
        if(existedUser){
            return NextResponse.json(
                {
                    message: "User already exists."
                },
                {
                    status: 400
                }
            )
        };
    
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass
            }
        });
    
        return NextResponse.json(
            {
                message: "User Created Sucessfully",
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                },
            },
            {
                status: 201
            }
        );
    } catch (error:any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}