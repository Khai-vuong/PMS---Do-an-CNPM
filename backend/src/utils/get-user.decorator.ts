// auth/decorators/get-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: keyof Express.User | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // If a specific property is requested (like user.id), return that
        return data ? user?.[data] : user;
    },
);
