import * as Hook from 'require-in-the-middle';
const typeGraphql = require('type-graphql');
const graphql = require('graphql');

Hook(['type-graphql', 'graphql'], function (exports, name, basedir) {
    switch (name) {
        case 'type-graphql':
            return typeGraphql;
        case 'graphql':
            return graphql;
        default:
            return exports;
    }
})

import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './Module/AppModule';

async function bootstrap() {
    try {
        const app = await NestFactory.create(
            AppModule,
            {
                cors: {
                    origin: '*',
                },
            },
        );
        app.useGlobalPipes(new ValidationPipe({transform: true, whitelist: true, forbidUnknownValues: true}));

        await app.listen(process.env.PORT || 3000);
    } catch (e) {
        console.error(e);
    }
}

bootstrap();
