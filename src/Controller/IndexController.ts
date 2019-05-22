import {Controller, Get} from '@nestjs/common';

@Controller('/')
export default class IndexController {
    @Get()
    public getAction(): { message: string } {
        return {message: 'Welcome to the Secretary API. Documentation can be found at https://secretary.dev/docs.'};
    }
}
