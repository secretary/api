import {HttpException, HttpStatus} from '@nestjs/common';
import {validateOrReject} from 'class-validator';
import {parse, stringify} from 'flatted';
import {EntitySubscriberInterface, EventSubscriber, InsertEvent} from 'typeorm';

@EventSubscriber()
export default class EntityValidationSubscriber implements EntitySubscriberInterface {
    /**
     * Called before entity insertion.
     */
    public async beforeInsert(event: InsertEvent<any>) {
        try {
            await validateOrReject(event.entity);
        } catch (e) {
            console.error(e);

            throw new HttpException(
                {
                    message: 'Validation Error!',
                    errors:  parse(stringify(e)),
                },
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
