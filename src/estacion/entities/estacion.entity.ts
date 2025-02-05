import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Medicion } from './../../medicion/entities/medicion.entity';
import { InformeEstacion } from 'src/informe-estacion/entities/informe-estacion.entity';

@Entity('estacion')
export class Estacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    numero_serie: string;

    @Column({ type: 'varchar', length: 255 })
    modelo: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'varchar', length: 255 })
    latitud: string;

    @Column({ type: 'varchar', length: 255 })
    longitud: string;

    @Column({ type: 'text' })
    variables: string;

    @Column({ type: 'int', default: 0 })
    estado: number;

    @Column({ type: 'text' })
    informacion_adicional: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Medicion, (medicion) => medicion.estacion, {
        cascade: true,   // Aplica en operaciones de save/update
        onDelete: 'CASCADE', // Aplica en eliminación
      })
    mediciones: Medicion[];

    @OneToMany(() => InformeEstacion, (informe_estacion) => informe_estacion.estacion, {
        cascade: true,   // Aplica en operaciones de save/update
        onDelete: 'CASCADE', // Aplica en eliminación
      })
    informesEstacion: InformeEstacion[];
}
