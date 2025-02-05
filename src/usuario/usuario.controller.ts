import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiExtension, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * whatever the string pass in controller decorator it will be appended to
 * API URL. to call any API from this controller you need to add prefix which is
 * passed in controller decorator.
 * in our case our base URL is http://localhost:3000/usuario
 */
@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  /**
   * Post decorator represents method of request as we have used post decorator the method
   * of this API will be post.
   * so the API URL to create Usuario will be
   * POST http://localhost:3000/usuario
   */
  @Post()
  @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }

  /**
   * we have used get decorator to get all the usuario's list
   * so the API URL will be
   * GET http://localhost:3000/usuario
   */
  @Get()
  @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  findAll() {
    return this.usuarioService.findAllUsuario();
  }

  /**
   * we have used get decorator with id param to get id from request
   * so the API URL will be
   * GET http://localhost:3000/usuario/:id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.viewUsuario(+id);
  }

  /**
   * we have used patch decorator with id param to get id from request
   * so the API URL will be
   * PATCH http://localhost:3000/usuario/:id
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.updateUsuario(+id, updateUsuarioDto);
  }

  /**
   * we have used Delete decorator with id param to get id from request
   * so the API URL will be
   * DELETE http://localhost:3000/usuario/:id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.removeUsuario(+id);
  }
}