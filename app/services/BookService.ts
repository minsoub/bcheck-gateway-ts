import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { BookInfoDto } from "../dto/BookInfoDto";
import { UserRepository } from "../repository/UserRepository";
import request from "request-promise-native";
import { env } from "../env";
import { logger } from "../utils/Logger";
import { ResponseDto } from "../dto/ResponseDto";
import { GeneralResponse } from "../response/GeneralResponse";
import { BookRegisterRequest } from "../dto/BookRegisterRequest";
import { BookRegisterChangeRequest } from "../dto/BookRegisterChangeRequest";
import { BookDeleteRequest } from "../dto/BookDeleteRequest";
import { ResponseBookList } from "../dto/ResponseBookList";

@Service()
export class BookService {

    constructor(
      @InjectRepository() private userRepository: UserRepository,
      //   @InjectRepository() private postRepository: PostRepository,
      //   @InjectRepository() private postCommentRepository: PostCommentRepository,
    ) {}


    /**
     * ISBN 정보를 책 정보를 조회한다.
     *
     * @param isbn isbn정보
     */
    public async isbnSearch(isbn: string) : Promise<ResponseDto> {

        const options = {
           uri: env.app.apiUrl + "/api/book/isbn",
           qs: {
             isbn: isbn,
           },
        };
        //
        const response = await request(options);
        logger.info(response);

        const result = new ResponseDto();

        if (response) {
           try {
               result.status = true;
               result.message = "데이터를 조회완료하였습니다!!!";
               result.data = JSON.parse(response);
           }catch(e) {
               result.status = false;
               result.message = "데이터를  조회하는데 에러가 발생하였습니다!";
               result.data = response;
           }
           return result;
        } else {
           result.status = false;
           result.message = "데이터가 존재하지 않습니다!!!";
           result.data = response;
           return result;
        }
    }

    /**
     * 도서 관리자 등록
     *
     * @param data
     */
    public async register(data: BookRegisterRequest) : Promise<GeneralResponse> {
        const options = {
            uri: env.app.apiUrl + "/api/book/register",
            method: "POST",
            json: data,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        };
        //
        const response = await request(options);
        logger.info(response);
        console.log(response);

        const result = new GeneralResponse();

        if (response) {
            try {
                if (response.status === 0) {
                    result.status = true;
                    result.message = "도서 관리자를 등록완료하였습니다!!!";
                    result.data = response;
                }else {
                    result.status = false;
                    result.message = "도서 관리자 등록하는데 에러가 발생하였습니다!";
                    result.data = response.message;
                }
            }catch(e) {
                result.status = false;
                result.message = "도서 관리자 등록하는데 에러가 발생하였습니다!";
                result.data = response;
            }
            return result;
        } else {
            result.status = false;
            result.message = "도서 관리자 등록하는데 에러가 발생하였습니다!";
            result.data = response;
            return result;
        }
    }

    /**
     * 도서 관리자 정보를 변경한다.
     * @param data
     */
    public async change(data: BookRegisterChangeRequest) : Promise<GeneralResponse> {
        const options = {
            uri: env.app.apiUrl + "/api/book/change",
            method: "POST",
            json: data,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        }

        const response = await request(options);
        logger.info(response);
        console.log(response);

        const result = new GeneralResponse();

        if (response) {
            try {
                if (response.status === 0) {
                    result.status = true;
                    result.message = "도서 관리자를 변경완료하였습니다!!!";
                    result.data = response;
                }else {
                    result.status = false;
                    result.message = "도서 관리자 변경하는데 에러가 발생하였습니다!";
                    result.data = response.message;
                }
            }catch(e) {
                result.status = false;
                result.message = "도서 관리자 변경하는데 에러가 발생하였습니다!";
                result.data = response;
            }
            return result;
        } else {
            result.status = false;
            result.message = "도서 관리자 변경하는데 에러가 발생하였습니다!";
            result.data = response;
            return result;
        }
    }

    /**
     * 도서 관리자 정보를 삭제한다.
     *
     * @param data
     * @param userid
     */
    public async delete(data: BookDeleteRequest, userid: string) : Promise<GeneralResponse> {
        const options = {
            uri: env.app.apiUrl + "/api/book/delete",
            qs: {
                id: data.id,
                del_type: data.del_type,
                del_content: data.del_content,
                userid: userid
            }
        }

        const response = await request(options);
        logger.info(response);
        console.log(response);

        const result = new GeneralResponse();

        if (response) {
            try {
                if (response.status === 0) {
                    result.status = true;
                    result.message = "도서 관리자를 삭제완료하였습니다!!!";
                    result.data = response;
                }else {
                    result.status = false;
                    result.message = "도서 관리자 삭제하는데 에러가 발생하였습니다!";
                    result.data = response.message;
                }
            }catch(e) {
                result.status = false;
                result.message = "도서 관리자 삭제하는데 에러가 발생하였습니다!";
                result.data = response;
            }
            return result;
        } else {
            result.status = false;
            result.message = "도서 관리자 삭제하는데 에러가 발생하였습니다!";
            result.data = response;
            return result;
        }
    }

    /**
     * 검색단어로 책 리스트를 조회한다. 
     *
     * @param word 검색단어
     */
    public async list(word: string) : Promise<ResponseBookList> {

        const options = {
            uri: env.app.apiUrl + "/api/book/list",
            qs: {
                word: word,
            },
        };
        //
        const response = await request(options);
        logger.info(response);

        const result = new ResponseBookList();

        if (response) {
            try {
                result.status = true;
                result.message = "데이터를 조회완료하였습니다!!!";
                result.data = JSON.parse(response);
            }catch(e) {
                result.status = false;
                result.message = "데이터를  조회하는데 에러가 발생하였습니다!";
                result.data = response;
            }
            return result;
        } else {
            result.status = false;
            result.message = "데이터가 존재하지 않습니다!!!";
            result.data = response;
            return result;
        }
    }

    /**
     * 검색단어로 책 리스트를 조회한다.
     *
     * @param book_name 서적명
     * @param name 관리자명
     */
    public async search(book_name: string, name: string) : Promise<ResponseBookList> {

        const options = {
            uri: env.app.apiUrl + "/api/book/search",
            qs: {
                book_name: book_name,
                name: name
            },
        };
        //
        const response = await request(options);
        logger.info(response);

        const result = new ResponseBookList();

        if (response) {
            try {
                result.status = true;
                result.message = "데이터를 조회완료하였습니다!!!";
                result.data = JSON.parse(response);
            }catch(e) {
                result.status = false;
                result.message = "데이터를  조회하는데 에러가 발생하였습니다!";
                result.data = response;
            }
            return result;
        } else {
            result.status = false;
            result.message = "데이터가 존재하지 않습니다!!!";
            result.data = response;
            return result;
        }
    }    


  /**
   * 동일한 이메일의 사용자가 있는지 검사한다.
   * @param email 이메일
   */
  public async isDuplicateUser(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (user) {
      return true;
    } else {
      return false;
    }
  }
}
