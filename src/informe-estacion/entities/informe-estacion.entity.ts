import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Informe } from './../../informe/entities/informe.entity';
import { Estacion } from './../../estacion/entities/estacion.entity';

@Entity('informe_estacion')
export class InformeEstacion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Informe, (informe) => informe.informesEstacion)
    informe: Informe;

    @ManyToOne(() => Estacion, (estacion) => estacion.informesEstacion, {
        onDelete: 'CASCADE', // Elimina la medición si la estación es eliminada
      })
    estacion: Estacion;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
