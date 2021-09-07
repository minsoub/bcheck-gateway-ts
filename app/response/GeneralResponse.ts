import { Request, Response, NextFunction } from "express";
import { IsNotEmpty, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'
import { Type } from 'class-transformer'
/**
 * 리턴 Body 메시지를 만들어서 리턴한다.
 *
 * @param status
 * @param message
 * @param data
 */
export const setResponseMessage = (
  status: boolean,
  message: string,
  data: any,
) => {
  return {
    status: status,
    message: message,
    data: data,
  };
};

/**
 * 도서 Return 정보
 */
export class GeneralResponse {
  @IsBoolean()
  @JSONSchema({
    description: '성공 여부(true, false)',
    example: true,
  })
  public status: boolean;

  @IsString()
  @JSONSchema({
    description: '결과 메시지',
    example: '완료하였습니다',
  })
  public message: string;

  @IsOptional()
  @JSONSchema({
    description: '요청 결과 데이터',
    example: '요청과 관계된 데이터'
  })
  public data: string;
}
