import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Estacion } from './estacion/entities/estacion.entity';
import { Unidad } from './unidad/entities/unidad.entity';
import { TipoMedicion } from './tipo-medicion/entities/tipo-medicion.entity';
import { Informe } from './informe/entities/informe.entity';
import { InformeEstacion } from './informe-estacion/entities/informe-estacion.entity';
import { Medicion } from './medicion/entities/medicion.entity';
import { Rol } from './rol/entities/rol.entity';

import { UsuarioModule } from './usuario/usuario.module';
import { EstacionModule } from './estacion/estacion.module';
import { UnidadModule } from './unidad/unidad.module';
import { TipoMedicionModule } from './tipo-medicion/tipo-medicion.module';
import { InformeModule } from './informe/informe.module';
import { InformeEstacionModule } from './informe-estacion/informe-estacion.module';
import { MedicionModule } from './medicion/medicion.module';
import { RolModule } from './rol/rol.module';
import { AppGateway } from './app.gateway';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Usuario,
        Estacion,
        Unidad,
        TipoMedicion,
        Informe,
        InformeEstacion,
        Medicion,
        Rol], // here we have added user enitity in entities array
      database: 'red_estaciones',
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    EstacionModule,
    UnidadModule,
    TipoMedicionModule,
    InformeModule,
    InformeEstacionModule,
    MedicionModule,
    RolModule,
    SocketModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,AppGateway],
})
export class AppModule {}