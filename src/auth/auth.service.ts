import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2';
import { AuthDto } from "./dto";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { access } from "fs";

@Injectable()
export class AuthService {

    constructor(private prismaservice: PrismaService, private jwt: JwtService, private config:ConfigService){}

    async signup(dto: AuthDto) {
        // generate the password hash 
        // save the new user in the db
        // return the saved user
        const hash = await argon.hash(dto.password);

        try{
        const user = await this.prismaservice.user.create({
            data: {
                email: dto.email,
                hash,
            }
        });  
        
        delete (user as any).hash;
        return this.signToken(user.id, user.email);
    }catch(error){

         if(error instanceof PrismaClientKnownRequestError){
            if(error.code === 'P2002'){
                throw new ForbiddenException('Credentials taken');
            }
         }   
    }

        // return {msg: 'I am a signup route'};
    }
    
    async signin(dto: AuthDto) {
         
        const user = await this.prismaservice.user.findUnique({
            where: {
                email: dto.email,
            },
        })

        if(!user){
            throw new ForbiddenException('Credentials incorrect');
        }
        const pw = await argon.verify(user.hash, dto.password);
        if(!pw){
            throw new ForbiddenException('Credentials incorrect');
        }
        // find the user by email
        // if user does not exist throw exception

        // compare the password
        // if password is incorrect throw exception
        // return the user
   
        return this.signToken(user.id, user.email);
        
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
        sub: userId,
        email,
    };

    const token = await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
    });

    return {
        access_token: token,
    };
}
}
