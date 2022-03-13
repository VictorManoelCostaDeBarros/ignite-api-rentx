import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity("users_tokens")
class UserToken {

  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToMany(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { UserToken }