import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { OrganizationalUnit } from '../../organizational_units/entities/organizational_unit.entity';
import { Project } from '../../projects/entities/project.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  type: string;

  @OneToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @OneToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'transmitter_id' })
  transmitter: User;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @OneToOne(() => OrganizationalUnit)
  @JoinColumn({ name: 'organizationalUnit_id' })
  organizational_unit: OrganizationalUnit;

  @CreateDateColumn()
  created_at: Date;
}
