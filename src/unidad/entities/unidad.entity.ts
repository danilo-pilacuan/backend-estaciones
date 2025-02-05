import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TipoMedicion } from './../../tipo-medicion/entities/tipo-medicion.entity';

@Entity('unidad')
export class Unidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    descripcion: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => TipoMedicion, (tipoMedicion) => tipoMedicion.unidad)
    tipo_medicion: TipoMedicion[];
}
