import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Transfer type',
    maxLength: 20,
    required: true,
  })
  type: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated vehicle id',
    required: true,
  })
  vehicle: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated client id',
    required: true,
  })
  client: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated transmitter id',
    required: true,
  })
  transmitter: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated project id',
    required: true,
  })
  project: number;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated organizational unit id',
    required: true,
  })
  organizational_unit: number;
}
