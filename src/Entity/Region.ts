import {IsNotEmpty} from 'class-validator';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import Organization from './Organization';

@Entity()
export default class Region {
    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    public name: string;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 32, unique: true, nullable: false})
    public awsCode: string;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    public resourceGroupArn: string;

    @IsNotEmpty()
    @ManyToOne(() => Organization, {nullable: false})
    @JoinColumn()
    public organization: Organization;

    @Column({type: 'datetime', nullable: false})
    @CreateDateColumn()
    public insertDate: Date;

    @Column({type: 'datetime', nullable: false})
    @UpdateDateColumn()
    public updateDate: Date;
}
