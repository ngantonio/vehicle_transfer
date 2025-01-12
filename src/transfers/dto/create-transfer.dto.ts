import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty({
    description: 'Transfer type',
    maxLength: 20,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsInt()
  type: string;

  @ApiProperty({
    type: Number,
    description: 'Associated vehicle id',
    required: true,
  })
  vehicle: number;

  @ApiProperty({
    type: Number,
    description: 'Associated client id',
    required: true,
  })
  @IsInt()
  client: number;

  @ApiProperty({
    type: Number,
    description: 'Associated transmitter id',
    required: true,
  })
  @IsInt()
  transmitter: number;

  @ApiProperty({
    type: Number,
    description: 'Associated project id',
    required: true,
  })
  @IsInt()
  project: number;

  @ApiProperty({
    type: Number,
    description: 'Associated organizational unit id',
    required: true,
  })
  @IsInt()
  organizational_unit: number;
}
