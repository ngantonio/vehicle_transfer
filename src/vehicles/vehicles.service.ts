import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}
  async create(createVehicleDto: CreateVehicleDto) {
    const newVehicle = this.vehicleRepository.create(createVehicleDto);
    return await this.vehicleRepository.save(newVehicle);
  }

  async findAll() {
    return await this.vehicleRepository.find();
  }

  async findOne(id: number) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: id },
    });

    if (!vehicle) throw new NotFoundException('Permission not found');
    return vehicle;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const vehicle = await this.findOne(id);
    const updatedPermission = Object.assign(vehicle, updateVehicleDto);
    return await this.vehicleRepository.save(updatedPermission);
  }

  async remove(id: number) {
    const vehicle = await this.findOne(id);
    return await this.vehicleRepository.remove(vehicle);
  }
}
