import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'spaces' })
export class Space {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  imageUrl?: string;
}
