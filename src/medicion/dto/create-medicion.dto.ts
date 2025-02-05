import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class CreateMedicionDto {
    @IsOptional()
    @IsInt()
    @ApiProperty({
        type: Number,
        default: 1
    })
    valor: number;
    
    @IsOptional()
    @IsInt()
    @ApiProperty({
        type: Number,
        default: 1
    })
    tipoMedicionId: number;

    @IsOptional()
    @IsInt()
    @ApiProperty({
        type: Number,
        default: 1
    })
    estacionId: number;
}
