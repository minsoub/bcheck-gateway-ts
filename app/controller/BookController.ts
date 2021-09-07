import {
  JsonController,
  Post,
  UseBefore,
  Get,
  Res,
  Body,
  Param,
  QueryParams,
  QueryParam,
  HttpCode,
} from "routing-controllers";
import {
  checkAccessToken,
  checkRefreshToken,
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/AuthMiddleware";
import { Response } from "express";
import { UserService } from "../services/UserService";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { BookInfoDto } from "../dto/BookInfoDto";
import { setResponseMessage } from "../response/GeneralResponse";
import { logger } from "../utils/Logger";
import { BookService } from "../services/BookService";
import { ResponseDto } from "../dto/ResponseDto";
import { GeneralResponse } from "../response/GeneralResponse";
import { BookRegisterRequest } from "../dto/BookRegisterRequest"; 
import { BookRegisterChangeRequest } from "../dto/BookRegisterChangeRequest";
import { BookDeleteRequest } from "../dto/BookDeleteRequest";
import { ResponseBookList } from "../dto/ResponseBookList";

@JsonController("/book")
export class BookController {

  constructor(private bookService: BookService) {}

  @HttpCode(200)
  @Get("/isbn/:isbn")
  @OpenAPI({
    summary: "책 정보 조회(isbn)",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        "in": "path",
        "name": "isbn",
        "schema": {
          "type": "string",
          "example": "9788960771291r"
        }
      }
    ]
  })
  @ResponseSchema(ResponseDto,
      {
          contentType: 'application/json',
          description: '도서 상세 정보'
      }
  )
  @UseBefore(checkAccessToken)
  public async isbnSearch(@Param("isbn") isbn: string, @Res() res: Response) {
    const result = this.bookService.isbnSearch(isbn);
    console.log(result);

    return result;
  }

  @HttpCode(200)
  @Post("/register")
  @OpenAPI({
    summary: "도서 관리자 등록",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
  })
  @ResponseSchema(GeneralResponse,
      {
        contentType: 'application/json',
        description: '등록 성공 여부'
      }
  )
  @UseBefore(checkAccessToken)
  public async register(@Body() req: BookRegisterRequest, @Res() res: Response) {
    const result = this.bookService.register(req);
    console.log(result);

    return result;
  }

  @HttpCode(200)
  @Post("/change")
  @OpenAPI({
    summary: "도서 관리자 변경",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
  })
  @ResponseSchema(GeneralResponse,
      {
        contentType: 'application/json',
        description: '변경 성공 여부'
      }
  )
  @UseBefore(checkAccessToken)
  public async change(@Body() req: BookRegisterChangeRequest, @Res() res: Response) {
    const result = this.bookService.change(req);
    console.log(result);

    return result;
  }

  // @HttpCode(200)
  // @Get("/delete")
  // @OpenAPI({
  //   summary: "도서 관리자 정보 삭제",
  //   statusCode: "200",
  //   responses: {
  //     "401": {
  //       description: "Unauthorized",
  //     },
  //   },
  //   security: [{ bearerAuth: [] }],
  // })
  // @ResponseSchema(GeneralResponse,
  //     {
  //       contentType: 'application/json',
  //       description: '삭제 성공 여부'
  //     }
  // )
  // @UseBefore(checkAccessToken)
  // public async delete(@QueryParams() query: BookDeleteRequest, @Res() res: Response) {
  //
  //   const userid = res.locals.jwtPayload.userId;
  //
  //   const result = this.bookService.delete(query, userid);
  //   console.log(result);
  //
  //   return result;
  // }

  @HttpCode(200)
  @Get("/delete")
  @OpenAPI({
    summary: "도서 관리자 정보 삭제",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        "in": "query",
        "name": "id",
        "required": true,
        "description": "관리자ID",
        "schema": {
          "type": "string",
          "example": "mjoung@hist.co.kr"
        }
      },
      {
        "in": "query",
        "name": "del_type",
        "required": true,
        "description": "삭제사유",
        "schema": {
          "type": "string",
          "example": "1"
        }
      },
      {
        "in": "query",
        "name": "del_content",
        "required": false,
        "description": "기타사유설명",
        "schema": {
          "type": "string",
          "example": ""
        }
      }
    ]
  })
  @ResponseSchema(GeneralResponse,
      {
        contentType: 'application/json',
        description: '삭제 성공 여부'
      }
  )
  @UseBefore(checkAccessToken)
  public async delete(@QueryParam("id", {required: true}) id: string,
                       @QueryParam("del_type", {required: true}) del_type: string,
                       @QueryParam("del_content",  {required: false}) del_content: string,
                       @Res() res: Response) {

    const userid = res.locals.jwtPayload.userId;

    let request = new BookDeleteRequest();
    request.id = id;
    request.del_content = del_content;
    request.del_type = del_type;

    const result = this.bookService.delete(request, userid);

    console.log(result);

    return result;
  }

  @HttpCode(200)
  @Get("/list")
  @OpenAPI({
    summary: "등록된 도서 리스트 검색",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        "in": "query",
        "name": "word",
        "description": "검색단어",
        "required": false,
        "schema": {
          "type": "string",
          "example": "",
        }
      }
    ]
  })
  @ResponseSchema(ResponseBookList,
      {
        contentType: 'application/json',
        description: '도서 리스트 정보'
      }
  )
  @UseBefore(checkAccessToken)
  public async list(@QueryParam("word", {required: false}) word: string, @Res() res: Response) {

    const userid = res.locals.jwtPayload.userId;

    const result = this.bookService.list(word);

    console.log(result);

    return result;
  }

  @HttpCode(200)
  @Get("/search")
  @OpenAPI({
    summary: "검색조건을 통한 등록된 도서 리스트 검색",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
    parameters: [
      {
        "in": "query",
        "name": "book_name",
        "description": "검색단어",
        "required": false,
        "schema": {
          "type": "string",
          "example": "HEAD FIRST"
        }
      },
      {
        "in": "query",
        "name": "name",
        "description": "관리자명",
        "required": false,
        "schema": {
          "type": "string",
          "example": "정민섭"
        }
      }        
    ]
  })
  @ResponseSchema(ResponseBookList,
      {
        contentType: 'application/json',
        description: '도서 검색 리스트 정보'
      }
  )
  @UseBefore(checkAccessToken)
  public async search(@QueryParam("book_name", {required: false}) book_name: string,
                      @QueryParam("name", {required: false}) name: string,
                      @Res() res: Response) {

    const userid = res.locals.jwtPayload.userId;

    const result = this.bookService.search(book_name, name);

    console.log(result);

    return result;
  }
  
}
