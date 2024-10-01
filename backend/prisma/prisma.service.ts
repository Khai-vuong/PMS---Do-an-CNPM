import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor() {
        //Recommend to use ConfigService to get the database UR, maybe in the future
        super({
            datasources: {
                db: {
                    url: "postgresql://postgres:yfycRjJPZkxuLYjuOPVHSmBzkantfuVF@autorack.proxy.rlwy.net:23613/railway"
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}