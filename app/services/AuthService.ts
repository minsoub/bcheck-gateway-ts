import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { Token } from "../entity/Token";
import { UserRepository } from "../repository/UserRepository";
import { TokenRepository } from "../repository/TokenRepository";
import { LoginUserDto } from "../dto/UserDto";
import { logger } from "../utils/Logger";

@Service()
export class AuthService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    @InjectRepository() private tokenRepository: TokenRepository,
  ) {}

  /**
   * 사용자 정보가 유효한지 확인하고 유효하면 사용자 정보를 반환한다.
   * @param loginUserDto 사용자 로그인 DTO
   */
  public async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ["emp_id", "emp_nm", "emp_password"],
      where: {
        emp_id: loginUserDto.id,
      },
    });

    if (user) {
      const isPasswordMatch = await user.comparePassword(loginUserDto.passwd);

      if (isPasswordMatch) {
        return user;
      }
    } else {
      logger.error(user);
    }

    return undefined;
  }

  /**
   * RefreshToken이 일치하는 사용자 정보를 반환한다.
   * @param userId 사용자 Id
   * @param refreshToekn RefreshToken
   */
  public async validateUserToken(
    userId: string,
    refreshToekn: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      select: ["emp_id", "emp_nm", "emp_password"],
      where: {
        emp_id: userId,
        refreshToekn: refreshToekn,
      },
    });

    if (user) {
      return user;
    }

    return undefined;
  }

  /**
   * 사용자 정보가 유효한지 확인하고 유효하면 사용자 정보를 반환한다.
   * @param loginUserDto 사용자 로그인 DTO
   */
  private async validateTokenUser(id: string): Promise<Token> {
    const token = await this.tokenRepository.findOne({
      where: {
        userid: id,
      },
    });

    if (token) {
      return token;
    }

    return undefined;
  }

  /**
   * 사용자 토큰 정보 삭제한다.
   *
   * @param id
   */
  public async logout(id: string): Promise<void> {
    const token = await this.tokenRepository.findOne({
      where: {
        userid: id,
      },
    });
    if (token) {
      await this.tokenRepository.delete(token);
    }
  }

  /**
   * Token을 사용자에게 저장한다.
   * @param user User
   * @param tokenData Token
   */
  public async saveRefreshToken(user: User, tokenData: string): Promise<void> {
    let token = await this.validateTokenUser(user.emp_id);
    console.log(token);
    logger.debug(token);
    if (token == undefined) {
      token = new Token();
      token.accessToken = tokenData;
      token.regDate = new Date();
      token.ttl = 60 * 60 * 24 * 14; // 14일
      token.userid = user.emp_id;
      await this.tokenRepository.save(token);
    } else {
      token.accessToken = tokenData;
      token.regDate = new Date();
      token.ttl = 60 * 60 * 24 * 14; // 14일
      await this.tokenRepository.save(token);
    }

    //user.refreshToekn = token;
    //await this.userRepository.save(user);
  }
}
