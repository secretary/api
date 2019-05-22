import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
// import {TypeOrmModule} from '@nestjs/typeorm';
import {unlinkSync} from 'fs';
import {join} from 'path';

import IndexController from '../Controller/IndexController';
// import TypeOrmConfigService from '../Database/TypeOrmConfigService';
// import Organization from '../Entity/Organization';
// import OrganizationUser from '../Entity/OrganizationUser';
import {OrganizationResolver} from '../Resolver/OrganizationResolver';
// import Manager from '../Secret/Manager';

/*
 const stripeFactory = {
 provide:    Stripe,
 useFactory: async (manager: Manager) => {
 const secret = await manager.getSecret('secretary/stripe');

 return new Stripe(secret.value[process.env.NODE_ENV].secret_key);
 },
 inject:     [Manager],
 };*/

const schema = join(__dirname, '/schema.gql');
console.log('GraphQL schema file generated at: ' + schema);

try {
    unlinkSync(schema);
} catch (e) {
}

@Module({
    providers:   [/*Manager, */OrganizationResolver],
    imports:     [
        //TypeOrmModule.forRootAsync({useClass: TypeOrmConfigService}),
        //TypeOrmModule.forFeature([Organization, OrganizationUser]),
        GraphQLModule.forRootAsync({
            useFactory: async () => {
                //const manager = new Manager();
                //const engine: any = (await manager.getSecret('secretary/apollo/engine')).value;

                return {
                    autoSchemaFile: schema,
                    //engine,
                };
            },
        }),
    ],
    controllers: [IndexController],
})
export class AppModule {
}
