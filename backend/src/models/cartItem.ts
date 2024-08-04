/*import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}*/

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 36 })
    session_id: string;

    @Column({ type: 'varchar', length: 255 })
    item_id: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    item_name: string;

    @Column({ type: 'text', nullable: true })
    item_description: string;

    @Column({ type: 'text', nullable: true })
    item_image_url: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
