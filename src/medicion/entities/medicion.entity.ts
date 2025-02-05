import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { TipoMedicion } from './../../tipo-medicion/entities/tipo-medicion.entity';
import { Estacion } from './../../estacion/entities/estacion.entity';

@Entity('medicion')
export class Medicion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'float', nullable: true })
    valor: number;

    
    @ManyToOne(() => TipoMedicion, (tipoMedicion) => tipoMedicion.mediciones)
    tipo_medicion: TipoMedicion;
    
    @ManyToOne(() => Estacion, (estacion) => estacion.mediciones, {
        onDelete: 'CASCADE', // Elimina la medición si la estación es eliminada
      })
      estacion: Estacion;
    
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
