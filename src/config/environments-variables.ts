import { IsEnum, IsNumber, Max, Min } from 'class-validator';

import { Environment } from './environment.enum';

export class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;
}
