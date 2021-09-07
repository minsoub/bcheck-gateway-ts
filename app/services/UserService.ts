import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/User";
import { UserRepository } from "../repository/UserRepository";
//import { PostRepository } from "../repositories/PostRepository";
//import { PostCommentRepository } from "../repositories/PostCommentRepository";
//import { CreateUserDto, UpdateUserDto } from "../dto/UserDto";

@Service()
export class UserService {
  constructor(
    @InjectRepository() private userRepository: UserRepository, //   @InjectRepository() private postRepository: PostRepository, //   @InjectRepository() private postCommentRepository: PostCommentRepository,
  ) {}

  /**
   * 사용자 정보를 조회한다.
   * @param id 사용자 Id
   */
  public async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      select: ["emp_id", "emp_nm", "cmpny_code"],
      where: { emp_id: id },
    });
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
