import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { TransferModulePermissions } from '../../utils/enums';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    type: Number,
    description: 'The role Id',
    required: true,
  })
  role_id: number;
}
