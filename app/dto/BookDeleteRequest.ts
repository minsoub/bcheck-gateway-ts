import { IsNotEmpty, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'
import { Type } from 'class-transformer'

export class BookDeleteRequest {
    @IsString()
    @IsNotEmpty()
    @JSONSchema({
        description: '도서 ID',
        example: "6125c0165b53fc0b29f10942",
    })
    public id: string;

    @IsString()
    @IsNotEmpty()
    @JSONSchema({
        description: '삭제사유(1, 2, 3=>기타사유)',
        example: "1",
    })
    public del_type: string;

    @IsString()
    @IsOptional()
    @JSONSchema({
        description: '기타사유',
        example: "기타사유 입력",
    })
    public del_content: string;
}
