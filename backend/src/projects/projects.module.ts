import { Module } from "@nestjs/common";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { PrismaService } from "prisma/prisma.service";
import { LocalStrategy } from "src/utils/local.strategy";
import { SessionSerializer } from "src/utils/session.serializer";
import { AuthService } from "src/auth/auth.service";

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService, PrismaService, LocalStrategy, SessionSerializer, AuthService]
})
export class ProjectsModule { }