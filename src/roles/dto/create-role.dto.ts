import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Roles } from '../../utils/enums';

export class CreateRoleDto {
  @IsString()
  @IsEnum(Roles, {
    message: 'role name must be RoleEnum',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role name',
    maxLength: 50,
    required: true,
  })
  name: Roles;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role description',
    maxLength: 100,
    required: true,
  })
  description: string;

  @IsOptional()
  @ApiPropertyOptional({
    type: Array<number>,
    description: "Associated permissions id's",
    required: false,
  })
  permissions_id?: Array<number>;
}
