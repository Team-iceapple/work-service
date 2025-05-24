import { Environment } from './environment.enum';
import {IsEnum, IsNumber, Max, Min} from 'class-validator';

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;
}