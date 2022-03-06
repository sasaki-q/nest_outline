import { ArgsOptions } from "@nestjs/graphql"

export const createArgOpts = <T>(
    name: string,
    type: T,
    nullable: boolean,
): ArgsOptions => ({
    name: name,
    type: () => type,
    nullable: nullable,
});