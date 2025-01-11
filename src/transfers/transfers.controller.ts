import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { RequiresPermission } from '../auth/decorators/permissions.decorator';
import { Role, TransferModulePermissions } from '../utils/enums';
import { PermissionsGuard } from '../auth/guard/permissions.guard';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth(Role.ADMIN)
@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @RequiresPermission(TransferModulePermissions.edit_transfers)
  @UseGuards(PermissionsGuard)
  @Post()
  create(@Req() req, @Body() createTransferDto: CreateTransferDto) {
    return this.transfersService.create(req.user.id, createTransferDto);
  }

  @RequiresPermission(TransferModulePermissions.view_transfers)
  @UseGuards(PermissionsGuard)
  @Get()
  findAll(@Req() req) {
    return this.transfersService.findAll(req.user.id);
  }

  @RequiresPermission(TransferModulePermissions.view_transfers)
  @UseGuards(PermissionsGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.transfersService.findOne(req.user.id, +id);
  }

  @RequiresPermission(TransferModulePermissions.edit_transfers)
  @UseGuards(PermissionsGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateTransferDto: UpdateTransferDto,
  ) {
    return this.transfersService.update(req.user.id, +id, updateTransferDto);
  }

  @RequiresPermission(TransferModulePermissions.delete_transfer)
  @UseGuards(PermissionsGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.transfersService.remove(req.user.id, +id);
  }
}
