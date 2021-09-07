import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ObjectIdColumn,
} from "typeorm";
import { IsNotEmpty } from "class-validator";
import bcrypt from "bcrypt";

@Entity({ name: "bchecktokens" })
export class Token {
  @ObjectIdColumn()
  _id: string;

  @IsNotEmpty()
  @Column({ name: "userid" })
  userid: string;

  @IsNotEmpty()
  @Column({ name: "accessToken" })
  accessToken: string;

  @IsNotEmpty()
  @Column({ name: "ttl" })
  ttl: number;

  @IsNotEmpty()
  @Column({ name: "regDate" })
  regDate: Date;

  // @BeforeInsert()
  // async hashPassword() {
  //     this.emp_password = await bcrypt.hash(this.emp_password, 10);
  // }
  //
  // async comparePassword(unencryptedPassword: string): Promise<boolean> {
  //     return await bcrypt.compare(unencryptedPassword, this.emp_password);
  // }
}
