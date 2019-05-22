import {Injectable} from '@nestjs/common';
import {Adapter} from '@secretary/aws-secrets-manager-adapter';
import {Manager as BaseManager} from '@secretary/core';
import {SecretsManager} from 'aws-sdk';

import credentials from '../credentials';

@Injectable()
export default class Manager extends BaseManager<Adapter> {
    public constructor() {
        super(new Adapter(new SecretsManager({region: 'us-east-1', credentials})));
    }
}
