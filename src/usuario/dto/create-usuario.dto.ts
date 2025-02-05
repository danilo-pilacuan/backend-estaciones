import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlphanumeric,
    IsBoolean,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUsuarioDto {
    // @IsString()
    // @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    // @IsNotEmpty()
    // name: string;

    // @IsNotEmpty()
    // @MinLength(3, { message: 'Usuarioname must have atleast 3 characters.' })
    // // @IsAlphanumeric(null, {
    // //   message: 'Usuarioname does not allow other than alpha numeric chars.',
    // // })
    // usuarioname: string;

    // @IsNotEmpty()
    // //@IsEmail(null, { message: 'Please provide valid Email.' })
    // email: string;

    // @IsInt()
    // age: number;

    // @IsString()
    // @IsEnum(['f', 'm', 'u'])
    // gender: string;

    // @IsNotEmpty()
    // @Matches(passwordRegEx, {
    //   message: `Password must contain Minimum 8 and maximum 20 characters, 
    //   at least one uppercase letter, 
    //   one lowercase letter, 
    //   one number and 
    //   one special character`,
    // })
    // password: string;


    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    nombre: string;


    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    @ApiProperty({
        type:String
    })
    correo: string;

    // @IsNotEmpty()
    // @Matches(passwordRegEx, {
    //     message: `Password must contain Minimum 8 and maximum 20 characters, 
    //   at least one uppercase letter, 
    //   one lowercase letter, 
    //   one number and 
    //   one special character`,
    // })
    @ApiProperty({
        type:String
    })
    clave: string;

    @IsBoolean()
    @ApiProperty({
        default: true
    })
    activo: boolean;

    @IsOptional()
    @IsInt()
    @ApiProperty({
        type: Number,
        default: 1
    })
    rolId?: number;
}