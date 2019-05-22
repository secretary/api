import {IsNotEmpty} from 'class-validator';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import {OrganizationUserRoleEnum} from '../Enum/OrganizationUserRoleEnum';

import Organization from './Organization';

@Entity()
export default class OrganizationUser {
    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 32, nullable: false})
    public user: string;

    @IsNotEmpty()
    @ManyToOne(() => Organization, (organization) => organization.users, {nullable: false, eager: true})
    @JoinColumn()
    public organization: Organization;

    @IsNotEmpty()
    @Column({type: 'simple-array', nullable: false})
    public roles: OrganizationUserRoleEnum[] = [OrganizationUserRoleEnum.VIEWER];

    @Column({type: 'datetime', nullable: false})
    @CreateDateColumn()
    public insertDate: Date;

    @Column({type: 'datetime', nullable: false})
    @UpdateDateColumn()
    public updateDate: Date;
}
