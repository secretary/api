import {resolve} from 'path';

import * as dotenv from 'dotenv';
dotenv.config({path: resolve(__dirname, '..', '..', '.env')});

import './main';
