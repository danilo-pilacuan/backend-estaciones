import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Injectable()
export class UsuarioService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>,@InjectRepository(Rol)
    private rolRepository: Repository<Rol>
  ) {}

  /**
   * this is function is used to create Usuario in Usuario Entity.
   * @param createUsuarioDto this will type of createUsuarioDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of usuario
   */
  async createUsuario(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { rolId, ...usuarioData } = createUsuarioDto;

    const rol = rolId ? await this.rolRepository.findOne({ where: { id: rolId } }) : null;

        const usuario = this.usuarioRepository.create({
            ...usuarioData
        });

        if (rol) {
            usuario.rol = rol;
        }

        return this.usuarioRepository.save(usuario);
  }

  /**
   * this function is used to get all the usuario's list
   * @returns promise of array of usuarios
   */
  async findAllUsuario(): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      relations: {
        rol: true,
      },
    });
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of usuario.
   * @returns promise of usuario
   */
  async viewUsuario(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: {
        rol: true,
      },
    });
    if (!usuario) {
      throw new Error('Usuario not found');
    }
    return usuario;
  }

  /**
   * this function is used to updated specific usuario whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of usuario.
   * @param updateUsuarioDto this is partial type of createUsuarioDto.
   * @returns promise of udpate usuario
   */
  async updateUsuario(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    // Desestructurar rolId y el resto de los datos del DTO
    const { rolId, ...usuarioData } = updateUsuarioDto;
  
    // Buscar el usuario por id
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
  
    // Si no se encuentra el usuario, lanzar una excepción
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
  
    // Asignar los nuevos valores del DTO al usuario, si están definidos
    if (usuarioData.nombre !== undefined) {
      usuario.nombre = usuarioData.nombre;
    }
    if (usuarioData.activo !== undefined) {
      usuario.activo = usuarioData.activo;
    }
    if (usuarioData.correo !== undefined) {
      usuario.correo = usuarioData.correo;
    }
  
    // Si rolId está presente, buscar el rol y asignarlo al usuario
    if (rolId) {
      const rol = await this.rolRepository.findOne({ where: { id: rolId } });
      if (rol) {
        usuario.rol = rol;
      }
    }
  
    // Guardar el usuario actualizado
    return this.usuarioRepository.save(usuario);
  }
  /**
   * this function is used to remove or delete usuario from database.
   * @param id is the type of number, which represent id of usuario
   * @returns nuber of rows deleted or affected
   */
  async removeUsuario(id: number): Promise<{ affected?: number }> {
    const result = await this.usuarioRepository.delete(id);
    return { affected: result.affected ?? undefined };
  }

  async getUserByUserEmail(userEmail: string): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOne({
        where: { correo: userEmail },
        relations: ['rol', 'informes', 'readonly'], // Cargar relaciones si es necesario
    });

    return usuario;
}
  
}