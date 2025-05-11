import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'generated/prisma/client';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';



@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}    
    @UseGuards(JwtGuard) 
    @Get('me')
    getMe(@GetUser() user: User)  {
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto,
    ){
        return this.userService.editUser(userId, dto);
    }
}


