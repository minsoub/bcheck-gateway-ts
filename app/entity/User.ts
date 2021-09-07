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

@Entity({ name: "bcheckemps" })
export class User {
  @ObjectIdColumn()
  _id: string;

  @IsNotEmpty()
  @Column({ name: "emp_id" })
  emp_id: string;

  @IsNotEmpty()
  @Column({ name: "emp_nm" })
  emp_nm: string;

  @IsNotEmpty()
  @Column({ name: "emp_password" })
  emp_password: string;

  @IsNotEmpty()
  @Column({ name: "cmpny_code" })
  cmpny_code: string;

  @Column({ name: "emp_role_flag", nullable: true })
  emp_role_flag: string;

  @Column({ name: "emp_tel_no" })
  emp_tel_no: string;

  @Column({ name: "start_dt" })
  start_dt: string;

  @Column({ name: "end_dt" })
  end_dt: string;

  @Column({ name: "regist_dtm" })
  regist_dtm: string;

  @Column({ name: "updt_dtm" })
  updt_dtm: string;

  @Column({ name: "regist_emp_id" })
  regist_emp_id: string;

  @Column({ name: "updt_emp_id" })
  updt_emp_id: string;

  @BeforeInsert()
  async hashPassword() {
    this.emp_password = await bcrypt.hash(this.emp_password, 10);
  }

  async comparePassword(unencryptedPassword: string): Promise<boolean> {
    return await bcrypt.compare(unencryptedPassword, this.emp_password);
  }
}
