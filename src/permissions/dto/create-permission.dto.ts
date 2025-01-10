import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { TransferModulePermissions } from '../../utils/enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @IsString()
  @IsEnum(TransferModulePermissions, {
    message: 'permission name must be TransferModulePermissions',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role name',
    maxLength: 50,
    required: true,
  })
  name: TransferModulePermissions;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'permission description',
    maxLength: 100,
    required: true,
  })
  description: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    type: Number,
    description: 'The role Id',
    required: false,
  })
  role_id?: number;
}
