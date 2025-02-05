// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Informe } from './../../informe/entities/informe.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nombre: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    correo: string;

    @Column({ type: 'varchar', length: 255 })
    clave: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany(() => Informe, (informe) => informe.usuario)
    informes: Informe[];

    @OneToMany(() => Informe, (informe) => informe.usuario)
    readonly: Informe[];

    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    rol: Rol;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
