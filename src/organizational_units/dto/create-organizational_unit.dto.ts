import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrganizationalUnitDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Organizational Unit name',
    maxLength: 80,
    required: true,
  })
  name: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: Array<number>,
    description: "Associated users id's",
    required: false,
  })
  users?: Array<number>;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'Associated project id',
    required: true,
  })
  project_id: number;
}
