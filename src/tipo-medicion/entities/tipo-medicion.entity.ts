import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Unidad } from './../../unidad/entities/unidad.entity';
import { Medicion } from './../../medicion/entities/medicion.entity';

@Entity('tipo_medicion')
export class TipoMedicion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    formato: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToOne(() => Unidad, (unidad) => unidad.tipo_medicion)
    unidad: Unidad;

    @OneToMany(() => Medicion, (medicion) => medicion.tipo_medicion)
    mediciones: Medicion[];
}
