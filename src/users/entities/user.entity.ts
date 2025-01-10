import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinTable,
  ManyToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { hash } from 'bcryptjs';

import { Project } from '../../projects/entities/project.entity';
import { OrganizationalUnit } from '../../organizational_units/entities/organizational_unit.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable({
    name: 'users_projects',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'project_id',
    },
  })
  projects: Project[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @ManyToMany(
    () => OrganizationalUnit,
    (organizational_unit) => organizational_unit.users,
  )
  @JoinTable({
    name: 'users_organizationalUnits',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'organizationalUnit_id',
    },
  })
  organizational_units: OrganizationalUnit[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
    this.password = await hash(this.password, 10);
  }
}
