import { IsNotEmpty, Length, IsEmail, IsString, IsBoolean, IsOptional } from "class-validator";
import { validationMetadatasToSchemas, JSONSchema } from 'class-validator-jsonschema'

/**
 * 도서 상세 정보
 */
export class BookInfoDto {
  @IsString()
  @JSONSchema({
    description: '책 ID',
    example: "61270b8379833b136fe7bffb",
  })
  public id: string;

  @IsString()
  @JSONSchema({
    description: '책 제목',
    example: "OKGOSU의 엑션스크립트 정석",
  })
  public title: string;

  @IsString()
  @JSONSchema({
    description: '링크정보',
    example: "http://book.naver.com/bookdb/book_detail.php?bid=6259425",
  })
  public link: string;

  @IsString()
  @JSONSchema({
    description: '이미지링크정보',
    example: "https://bookthumb-phinf.pstatic.net/cover/062/594/06259425.jpg?type=m1&udate=20141122",
  })
  public image: string;

  @IsString()
  @JSONSchema({
    description: '작가',
    example: "옥상훈",
  })
  public author: string;

  @IsString()
  @JSONSchema({
    description: '가격',
    example: "48000",
  })
  public price: string;

  @IsString()
  @JSONSchema({
    description: '할인가격',
    example: "42000",
  })
  public discount: string;

  @IsString()
  @JSONSchema({
    description: '출판사',
    example: "에이콘출판",
  })
  public publisher: string;

  @IsString()
  @JSONSchema({
    description: '발행일자',
    example: "20100419",
  })
  public pubdate: string;

  @IsString()
  @JSONSchema({
    description: 'ISBN NO.',
    example: "8960771295 9788960771291",
  })
  public isbn: string;

  @IsString()
  @JSONSchema({
    description: '설명',
    example: "액션스크립트의 고수가 되자!「에이콘 웹 프로페셔널」 제24권 『OKGOSU의 액션스크립트 정석』. 'OKGOSU'라는 닉네임으로 13년간 자바개발자로 활동하면서 한국자바개발자협의회의 회장을 역임하기도 한 저자가, 액션스크립트에 관한 모든 것을 설명하고 있다. 2D 그래픽과 3D 그래픽, 애니메이션...",
  })
  public description: string;
}
