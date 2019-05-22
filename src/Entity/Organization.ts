import {Field, ID, ObjectType} from 'type-graphql';
import {IsNotEmpty} from 'class-validator';
import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import OrganizationUser from './OrganizationUser';

@Entity()
@ObjectType()
export default class Organization {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    public id: number;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 64, unique: true, nullable: false})
    @Field()
    public name: string;

    @IsNotEmpty()
    @Column({type: 'varchar', length: 64, nullable: false})
    @Field()
    public owner: string;

    @OneToMany(() => OrganizationUser, (user) => user.organization, {nullable: false})
    // @Field(() => [OrganizationUser])
    public users: Promise<OrganizationUser[]>;

    @Column({type: 'varchar', length: 64, nullable: true})
    @Field({nullable: true})
    public stripeCustomerId: string;

    @IsNotEmpty()
    @Column({type: 'boolean', default: true, nullable: false})
    @Field()
    public enabled: boolean = true;

    @Column({type: 'datetime', nullable: false})
    @CreateDateColumn()
    @Field()
    public insertDate: Date;

    @Column({type: 'datetime', nullable: false})
    @UpdateDateColumn()
    @Field()
    public updateDate: Date;
}
