import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Role } from '../../utils/enums';
import { CreatePermissionDto } from '../../permissions/dto/create-permission.dto';
import { Type } from 'class-transformer';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    maxLength: 50,
    required: true,
    enum: Role,
  })
  @IsEnum(Role, {
    message: 'role name must be RoleEnum',
  })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role description',
    maxLength: 100,
    required: true,
  })
  description: string;

  @ValidateNested()
  @Type(() => CreatePermissionDto)
  @ApiProperty({
    type: Array<CreatePermissionDto>,
    description: 'Permissions object',
    required: true,
  })
  permissions?: Array<CreatePermissionDto>;
}
