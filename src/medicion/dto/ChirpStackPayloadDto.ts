import {
    IsString,
    IsBoolean,
    IsInt,
    IsOptional,
    IsNumber,
    IsObject,
    IsArray,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
  
  class DeviceInfoDto {
    @IsString()
    tenantId: string;
  
    @IsString()
    tenantName: string;
  
    @IsString()
    applicationId: string;
  
    @IsString()
    applicationName: string;
  
    @IsString()
    deviceProfileId: string;
  
    @IsString()
    deviceProfileName: string;
  
    @IsString()
    deviceName: string;
  
    @IsString()
    devEui: string;
  
    @IsString()
    deviceClassEnabled: string;
  
    @IsObject()
    tags: Record<string, string>;
  }
  
  class LocationDto {
    @IsNumber()
    latitude: number;
  
    @IsNumber()
    longitude: number;
  }
  
  class RxInfoDto {
    @IsString()
    gatewayId: string;
  
    @IsInt()
    uplinkId: number;
  
    @IsString()
    nsTime: string;
  
    @IsInt()
    rssi: number;
  
    @IsNumber()
    snr: number;
  
    @IsInt()
    channel?: number;
  
    @IsInt()
    rfChain: number;
  
    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;
  
    @IsString()
    context: string;
  
    @IsObject()
    metadata: Record<string, string>;
  
    @IsString()
    crcStatus: string;
  }
  
  class LoraModulationDto {
    @IsInt()
    bandwidth: number;
  
    @IsInt()
    spreadingFactor: number;
  
    @IsString()
    codeRate: string;
  }
  
  class ModulationDto {
    @ValidateNested()
    @Type(() => LoraModulationDto)
    lora: LoraModulationDto;
  }
  
  class TxInfoDto {
    @IsInt()
    frequency: number;
  
    @ValidateNested()
    @Type(() => ModulationDto)
    modulation: ModulationDto;
  }
  
  export class ChirpStackPayloadDto {
    @ApiProperty()
    @IsString()
    deduplicationId: string;
  
    @ApiProperty()
    @IsString()
    time: string;
  
    @ApiProperty()
    @ValidateNested()
    @Type(() => DeviceInfoDto)
    deviceInfo: DeviceInfoDto;
  
    @ApiProperty()
    @IsString()
    devAddr: string;
  
    @ApiProperty()
    @IsBoolean()
    adr: boolean;
  
    @ApiProperty()
    @IsInt()
    dr: number;
  
    @ApiProperty()
    @IsInt()
    fCnt: number;
  
    @ApiProperty()
    @IsInt()
    fPort: number;
  
    @ApiProperty()
    @IsBoolean()
    confirmed: boolean;
  
    @ApiProperty()
    @IsString()
    data: string;
  
    @ApiProperty()
    @IsObject()
    object: Record<string, string>;
  
      
    
    // @ApiProperty()
    // @IsObject()
    // rxInfo: Record<string, string>;
  
  
    // @ApiProperty()
    // @IsObject()
    // txInfo: Record<string, string>;

  }