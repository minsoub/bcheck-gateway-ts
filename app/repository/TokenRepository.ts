import { EntityRepository, Repository } from "typeorm";
import { Token } from "../entity/Token";

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {}
