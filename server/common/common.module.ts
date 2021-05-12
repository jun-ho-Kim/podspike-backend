import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CoreEntity } from "./entities/coreEntity";


@Module({
    imports: [TypeOrmModule.forFeature([CoreEntity])],
    providers: [],
    exports: [],
})
export class CommonModule {}