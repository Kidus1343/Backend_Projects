import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,) {
    constructor(
        configService: ConfigService,
        private prisma: PrismaService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET')!, // Use ConfigService to get the secret
        });
    }

    async validate(payload: {sub: number, email: string}): Promise<any> {
        // Here you can add logic to validate the payload or fetch user details
        // For example, you could return the user object or specific claims
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
        });

        delete (user as any).hash;
        return user;
    }
}