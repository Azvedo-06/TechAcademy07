import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  descriptionCard: string;

  @Column()
  descriptionModal: string;

  @Column({nullable: true})
  userId: number;
}
