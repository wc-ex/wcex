import "json-schema"
import { JSONSchema7 } from "json-schema";

const schema: JSONSchema7 = {
    type: "object",
    properties: {
        foo: {
        type: "string",
        minLength: 2,
        maxLength: 10,
        },
        bar: {
        type: "number",
        minimum: 0,
        maximum: 100,
        },
        baz: {
        type: "boolean",
        },
    },
    required: ["foo", "bar", "baz"],
    additionalProperties: false,
};
