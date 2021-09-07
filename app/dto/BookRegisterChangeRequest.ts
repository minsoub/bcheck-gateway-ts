import { IsNotEmpty, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'
import { Type } from 'class-transformer'

export class BookRegisterChangeRequest {
    @IsString()
    @JSONSchema({
        description: '도서 ID',
        example: "6125c0165b53fc0b29f10942",
    })
    public id: string;

    @IsString()
    @JSONSchema({
        description: 'ISBN No.',
        example: "9788960771291",
    })
    public isbn: string;

    @IsString()
    @JSONSchema({
        description: '관리자로 등록된 사용자 아이디',
        example: "mjoung@hist.co.kr",
    })
    public userid: string;

    @IsString()
    @JSONSchema({
        description: '관리자로 변경할 사용자 아이디',
        example: "bson@hist.co.kr",
    })
    public change_userid: string;
}
