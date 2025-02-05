import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Usuario } from './../../usuario/entities/usuario.entity';
import { InformeEstacion } from 'src/informe-estacion/entities/informe-estacion.entity';

@Entity('informe')
export class Informe {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.informes)
    usuario: Usuario;

    @Column({ type: 'text' })
    informacion_adicional: string;

    @OneToMany(() => InformeEstacion, (informe_estacion) => informe_estacion.informe)
    informesEstacion: InformeEstacion[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
