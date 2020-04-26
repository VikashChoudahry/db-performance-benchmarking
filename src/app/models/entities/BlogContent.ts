import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BlogContent {

  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar", nullable: false })
  public title: string;

  @Column({ type: "json", nullable: false })
  public data: any;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
