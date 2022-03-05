import { Field, InputType, Int } from "@nestjs/graphql"

@InputType()
export class DataType {
    @Field()
    uid: number

    @Field()
    title: string

    @Field()
    content: string
}