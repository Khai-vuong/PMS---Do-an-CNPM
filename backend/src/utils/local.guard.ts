import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext) {
        console.log('LocalGuard');

        const request = context.switchToHttp().getRequest();

        console.log(request.session);     //Third action set this to undefined

        // if (!request.session.authenticated) { return false; }

        const result = (await super.canActivate(context)) as boolean;   //This call the Strategy validate method
        await super.logIn(request);     //Setting cookie session

        return result;
    }
}
