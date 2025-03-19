import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    username :string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    password :string;
}

export class AuthJWTDTO{
    @ApiProperty({
        type:String
    })
    jwt:string
}

export class AuthUserDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    _id:string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    name: string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    lastname:string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    birthdate:string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    phone:string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    email: string;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    idNumber:string;

    @IsNotEmpty()
    @ApiProperty({
        type:Object
    })
    assignedPatient:{
      _id:string
      name: string;
      lastname:string;
      birthdate:string;
      contactInfo:string;
      idNumber:string;
    }
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    accessToken: string;


}