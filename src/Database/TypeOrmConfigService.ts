import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';

import Organization from '../Entity/Organization';
import OrganizationUser from '../Entity/OrganizationUser';
import Region from '../Entity/Region';
import Manager from '../Secret/Manager';
import EntityValidationSubscriber from '../Subscriber/EntityValidationSubscriber';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private manager: Manager;

    public constructor() {
        this.manager = new Manager();
    }

    public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const credentials = await this.manager.getSecret('secretary/database/main');
        const host        = {
            host:     credentials.value['endpoint'],
            port:     parseInt(credentials.value['port'], 10),
            username: credentials.value['username'],
            password: credentials.value['password'],
            database: process.env.database_name || 'main',
        };

        return {
            type:              'mysql',
            supportBigNumbers: true,
            synchronize:       true,
            logger:            'advanced-console',
            logging:           false,
            bigNumberStrings:  true,
            replication:       {
                master: host,
                slaves: [host],
            },
            entities:          [Organization, OrganizationUser, Region],
            subscribers:       [EntityValidationSubscriber],
        };
    }
}
