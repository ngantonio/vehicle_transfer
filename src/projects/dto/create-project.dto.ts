import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project name',
    maxLength: 80,
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Project description',
    maxLength: 200,
    required: true,
  })
  description: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: Array<number>,
    description: "Associated users id's",
    required: false,
  })
  users?: Array<number>;

  @IsOptional()
  @ApiPropertyOptional({
    type: Array<number>,
    description: "Associated organizational units id's",
    required: false,
  })
  organizational_units?: Array<number>;
}
