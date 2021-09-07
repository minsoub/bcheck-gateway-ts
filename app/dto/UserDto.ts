import { IsNotEmpty, Length, IsEmail } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'
import { User } from "../entity/User";

/**
 * 사용자 로그인 DTO
 */
export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  @JSONSchema({
    description: '사용자 아이디',
    example: 'mjoung@hist.co.kr',
  })
  public id: string;

  @IsNotEmpty()
  @JSONSchema({
    description: '사용자 패스워드',
    example: 'mjoung@hist.co.kr',
  })
  public passwd: string;
}
