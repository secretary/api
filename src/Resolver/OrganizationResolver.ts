import {Args, Info, Mutation, Query, Resolver} from '@nestjs/graphql';
import {InjectRepository} from '@nestjs/typeorm';
import {ID} from 'type-graphql';
import {Repository} from 'typeorm';

import Organization from '../Entity/Organization';
import OrganizationUser from '../Entity/OrganizationUser';

@Resolver(() => Organization)
export class OrganizationResolver {
    public constructor(
        @InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>,
        @InjectRepository(OrganizationUser) private readonly organizationUserRepository: Repository<OrganizationUser>,
    ) {
    }

    @Query(() => Organization, {name: 'organizationByOwner', nullable: true})
    public async getOrganizationByOwner(@Args('owner') owner: string): Promise<Organization> {
        const org = await this.organizationRepository.findOneOrFail({owner});

        return org.enabled ? org : null;
    }

    @Query(() => Organization, {name: 'organization', nullable: true})
    public async getOrganization(@Args({name: 'id', type: () => ID}) id: number): Promise<Organization> {
        const org = await this.organizationRepository.findOneOrFail(id);

        return org.enabled ? org : null;
    }

    @Mutation(() => Organization, {nullable: true})
    public async createOrganization(@Info() context: any, @Args('name') name: string) {
        // @ts-ignore
        console.log(context);

        const organization = this.organizationRepository.create();
        organization.id    = 1;

        return organization;
    }
}
