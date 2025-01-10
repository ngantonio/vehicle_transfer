import { User } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Project } from '../../projects/entities/project.entity';

@Entity()
export class OrganizationalUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 50 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  //project_id:

  @ManyToMany(() => User, (user) => user.organizational_units)
  users: User[];

  @ManyToOne(() => Project, (project) => project.organizational_units)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
