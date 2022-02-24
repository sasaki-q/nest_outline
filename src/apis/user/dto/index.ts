import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEnum, IsNotEmpty } from "class-validator";
import { User } from "../entity";
import { UserRole } from "../type";

export class CreateUserDto {
    @ApiProperty({type: String})
    @IsNotEmpty({message: "名前は必須属性です"})
    name: string

    @ApiProperty({type: UserRole})
    @IsNotEmpty({message: "役割は必須属性"})
    @IsEnum(UserRole, {message: "RoleはUserRoleを参照してください"})
    @Equals("MASTER" || "ADMIN" || "USER")
    role: UserRole
}

export class ResponseDto {
    @ApiProperty({type: Number})
    statusCode: number

    @ApiProperty({type: [User]})
    users: User[]
}