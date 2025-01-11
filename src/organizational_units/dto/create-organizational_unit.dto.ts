import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationalUnitDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Organizational Unit name',
    maxLength: 80,
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    type: Array<number>,
    description: "Associated users id's",
    required: true,
  })
  users: Array<number>;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated project id',
    required: true,
  })
  project_id: number;
}
