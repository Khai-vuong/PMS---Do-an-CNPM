import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//Tested to be correct

export const GetUser = createParamDecorator(
    (data: keyof Express.User | undefined, context: ExecutionContext) => {
        console.log('GetUser decorator');
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // If a specific property is requested (like user.id), return that
        return data ? user?.[data] : user;
    },
);
