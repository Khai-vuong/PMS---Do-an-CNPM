import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        if (!request.session.authenticated) { return false; }

        const result = (await super.canActivate(context)) as boolean;
        await super.logIn(request);

        return result;
    }
}
