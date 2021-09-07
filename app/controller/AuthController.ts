import { AuthService } from "../services/AuthService";
import {
  JsonController,
  Post,
  UseBefore,
  Get,
  Res,
  Body,
  BodyParam,
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
import { OpenAPI } from "routing-controllers-openapi";
import { LoginUserDto } from "../dto/UserDto";
import { setResponseMessage } from "../response/GeneralResponse";
import { logger } from "../utils/Logger";

@JsonController("/auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(200)
  @Post("/login")
  @OpenAPI({
    summary: "사용자 로그인",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    requestBody: {
      content: {
        "application/x-www-form-urlencoded": {
          schema: {
            type: "object",
            properties: {
              "id": {
                description: "User ID",
                example: "mjoung@hist.co.kr",
                type: "string"
              },
              "passwd": {
                description: "User Password",
                example: "mjoung@hist.co.kr",
                type: "string"
              }
            },
            required: ["id", "passwd"]
          }
        }
      }
    }
  })
  public async login(@BodyParam("id", {required: true}) id: string,
                     @BodyParam("passwd", {required: true}) passwd: string,
                     @Res() res: Response) {  // loginUserDto: LoginUserDto, @Res() res: Response) {
    let loginUserDto = new LoginUserDto();
    loginUserDto.id = id;
    loginUserDto.passwd = passwd;
    const user = await this.authService.validateUser(loginUserDto);
    console.log(user);
    logger.debug(user);

    if (!user) {
      return res
        .status(401)
        .send(
          setResponseMessage(
            false,
            "유효하지 않은 사용자 이메일/비밀번호 입니다.",
            null,
          ),
        );
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await this.authService.saveRefreshToken(user, refreshToken);

    return setResponseMessage(true, "로그인 성공", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  @HttpCode(200)
  @Get("/logout")
  @OpenAPI({
    summary: "로그아웃 처리",
    description: "로그아웃 처리한다.",
    statusCode: "200",
    responses: {
      "401": {
        description: "Unauthorized",
      },
    },
    security: [{ bearerAuth: [] }],
  })
  @UseBefore(checkAccessToken)
  public async logout(@Res() res: Response) {
    const userid = res.locals.jwtPayload.userId;

    await this.authService.logout(userid);

    return setResponseMessage(true, "로그아웃 성공", null);
  }

  // @HttpCode(200)
  // @Post("/register")
  // @OpenAPI({
  //     summary: "사용자 회원가입",
  //     statusCode: "200",
  // })
  // public async register(@Body() createUserDto: CreateUserDto) {
  //     const isDuplicateUser = await this.userService.isDuplicateUser(
  //         createUserDto.email,
  //     );
  //
  //     if (isDuplicateUser) {
  //         return {
  //             error: true,
  //             message: "이미 사용 중인 이메일입니다.",
  //         };
  //     }
  //
  //     const newUser = await this.userService.createUser(createUserDto);
  //
  //     const accessToken = generateAccessToken(newUser);
  //     const refreshToken = generateRefreshToken(newUser);
  //     await this.authService.saveRefreshToken(newUser, refreshToken);
  //
  //     const user: ResponseUserDto = {
  //         id: newUser.id,
  //         realName: newUser.realName,
  //         email: newUser.email,
  //     };
  //
  //     return {
  //         user,
  //         accessToken: accessToken,
  //         refreshToken: refreshToken,
  //     };
  // }
  //
  // @HttpCode(200)
  // @Post("/token/refresh")
  // @OpenAPI({
  //     summary: "토큰 재발급",
  //     description: "RefreshToken을 이용해서 AccessToken을 재발급(새로고침)",
  //     statusCode: "200",
  //     responses: {
  //         "401": {
  //             description: "Unauthorized",
  //         },
  //     },
  //     security: [{ bearerAuth: [] }],
  // })
  // @UseBefore(checkRefreshToken)
  // public async refreshToken(@Res() res: Response) {
  //     const userId = res.locals.jwtPayload.userId;
  //     const refreshToken = res.locals.token;
  //
  //     const user = await this.authService.validateUserToken(userId, refreshToken);
  //
  //     if (!user) {
  //         return res.status(401).send({
  //             message: "유저 정보와 RefreshToken이 일치하지 않습니다.",
  //         });
  //     }
  //
  //     const accessToken = generateAccessToken(user);
  //
  //     return {
  //         accessToken: accessToken,
  //         refreshToken: refreshToken,
  //     };
  // }
  //
  // @HttpCode(200)
  // @Get("/user")
  // @OpenAPI({
  //     summary: "사용자 정보",
  //     description:
  //         "AccessToken으로 사용자 정보를 반환한다(Front에서 Token 인증 용도로 사용한다)",
  //     statusCode: "200",
  //     security: [{ bearerAuth: [] }],
  // })
  // @UseBefore(checkAccessToken)
  // public auth(@Res() res: Response) {
  //     const { userId, userName, userEmail } = res.locals.jwtPayload;
  //
  //     const user: ResponseUserDto = {
  //         id: userId,
  //         realName: userName,
  //         email: userEmail,
  //     };
  //
  //     return {
  //         user,
  //     };
  // }
}
