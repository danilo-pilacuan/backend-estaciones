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
    
      @CreateDateColumn({
        type: 'timestamp',
        transformer: {
          to: (value: Date) => value,
          from: (value: Date) => {
            // Convierte de UTC a tu zona horaria local (-5 horas para Ecuador)
            return new Date(value.getTime() ).toLocaleString('es-ES', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
          });
          }
        }
      })
      created_at: Date;
}
