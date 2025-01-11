import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle plate number',
    maxLength: 20,
    required: true,
  })
  plate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vehicle service',
    maxLength: 20,
    required: true,
  })
  service: string;
}
