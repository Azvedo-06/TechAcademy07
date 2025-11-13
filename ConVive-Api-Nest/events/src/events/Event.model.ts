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

  @Column({type: 'date', nullable: true}) // Permitir nulo temporariamente
  date: string;

  @Column({nullable: true})
  spaceId: number;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column()
  descriptionCard: string;

  @Column()
  descriptionModal: string;

  @Column({nullable: true})
  userId: number;
}
