import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nftId: string;

    @Column()
    title: string;

    @Column()
    imageUrl: string;

    @Column()
    price: number;
}
