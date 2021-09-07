import { IsNotEmpty, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'
import { Type } from 'class-transformer'
import { BookInfoDto } from "./BookInfoDto";
/**
 * 도서 Return 정보
 */
export class ResponseDto {
  @IsBoolean()
  @JSONSchema({
    description: '성공 여부',
    example: true,
  })
  public status: boolean;

  @IsString()
  @JSONSchema({
    description: '결과 메시지',
    example: '조회를 완료하였습니다',
  })
  public message: string;

  @IsOptional()
  @JSONSchema({
    description: '도서 정보',
    type: 'object',
    example: {
      title: 'OKGOSU의 엑션스크립트 정석',
      link: 'http://book.naver.com/bookdb/book_detail.php?bid=6259425',
      image: 'https://bookthumb-phinf.pstatic.net/cover/062/594/06259425.jpg?type=m1&udate=20141122',
      author: '옥상훈',
      price: '48000',
      discount: '4200',
      publisher: '에이콘출판',
      pubdate: '20100419',
      isbn: '8960771295 9788960771291',
      description: '액션스크립트의 고수가 되자!「에이콘 웹 프로페셔널」 제24권 『OKGOSU의 액션스크립트 정석』. \'OKGOSU\'라는 닉네임으로 13년간 자바개발자로 활동하면서 한국자바개발자협의회의 회장을 역임하기도 한 저자가, 액션스크립트에 관한 모든 것을 설명하고 있다. 2D 그래픽과 3D 그래픽, 애니메이션...'
    }
  })
  @Type(() => BookInfoDto)
  public data: BookInfoDto;
}
