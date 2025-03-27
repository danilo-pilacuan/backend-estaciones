import { Injectable } from '@nestjs/common';
import { CreateMedicionDto } from './dto/create-medicion.dto';
import { UpdateMedicionDto } from './dto/update-medicion.dto';
import { ChirpStackPayloadDto } from './dto/ChirpStackPayloadDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Medicion } from './entities/medicion.entity';
import { MedicionHistorico } from './entities/medicion-historico.entity';
import { TipoMedicion } from 'src/tipo-medicion/entities/tipo-medicion.entity';
import { Estacion } from 'src/estacion/entities/estacion.entity';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class MedicionService {

  constructor(
    @InjectRepository(Medicion) private readonly medicionRepository: Repository<Medicion>,
    @InjectRepository(MedicionHistorico) private readonly medicionHistoricoRepository: Repository<MedicionHistorico>,
    @InjectRepository(TipoMedicion) private readonly tipoMedicionRepository: Repository<TipoMedicion>,
    @InjectRepository(Estacion) private readonly estacionRepository: Repository<Estacion>,
    private readonly socketService:SocketService
  ) {}

  // create(createMedicionDto: CreateMedicionDto) {
  //   return 'This action adds a new medicion';
  // }

  async create(createMedicionDto: CreateMedicionDto): Promise<Medicion> {
    console.log('???????????????????????');
    console.log('createMedicionDto:', createMedicionDto);
    const { tipoMedicionId,estacionId,...medicionData } = createMedicionDto;

    const tipoMedicion = tipoMedicionId ? await this.tipoMedicionRepository.findOne({ where: { id: tipoMedicionId } }) : null;
    const estacion = estacionId ? await this.estacionRepository.findOne({ where: { id: estacionId } }) : null;

        const medicion = this.medicionRepository.create({
            ...medicionData
        });
        
        if (estacion) {
            medicion.estacion = estacion;
        }

        if (tipoMedicion) {
            medicion.tipo_medicion = tipoMedicion;
        }

        return this.medicionRepository.save(medicion);
  }


  findAll() {
    return this.medicionRepository.find({
      relations: {
        estacion: true,
        tipo_medicion: {
          unidad: true
        },
      },
    });
  }

  async findByEstacionId(estacionId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calcula el offset
    
    const [result, total] = await this.medicionRepository.findAndCount({
      relations: {
        estacion: true,
        tipo_medicion: true,
      },
      where: {
        estacion: { id: estacionId } // Asegura que la búsqueda se haga por estación
      },
      take: limit, // Límite de resultados por página
      skip: skip,  // Offset para paginación
      order: { created_at: 'DESC' }, // Ordenar por fecha de creación
    });
  
    return {
      data: result,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async transferToHistorico(): Promise<void> {
    // Obtener todas las mediciones actuales (puedes aplicar filtros si es necesario)
    const mediciones = await this.medicionRepository.find({ relations: ['estacion', 'tipo_medicion'] });

    // Crear registros históricos basados en las mediciones actuales
    const medicionesHistorico = mediciones.map((medicion) => {
      const historico = new MedicionHistorico();
      historico.valor = medicion.valor;
      historico.tipo_medicion = medicion.tipo_medicion;
      historico.estacion = medicion.estacion;
      historico.created_at =medicion.created_at_label;
      //historico.created_at = medicion.created_at;  // Mantener la misma fecha de creación
      return historico;
    });

    // Guardar las mediciones en la tabla de histórico
    const guardar=medicionesHistorico
    await this.medicionHistoricoRepository.save(guardar);

    // Opcional: eliminar las mediciones actuales si ya se transfirieron
    await this.medicionRepository.delete({}); // Esto elimina todas las mediciones. Puedes aplicar filtros para borrar selectivamente.

    console.log('Transferencia de mediciones a histórico completada.');
  }

  async findByEstacionNumeroSerie(numero_serie: string,tipo_medicion:number=1, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit; // Calcula el offset
    
    const [result, total] = await this.medicionRepository.findAndCount({
      relations: {
        estacion: true,
        tipo_medicion: {
          unidad: true
        },
      },
      where: {
        estacion: {
          numero_serie: numero_serie,   // Filtro por el número de serie de la estación
        },
        tipo_medicion: { 
          id: tipo_medicion         // Filtro por el ID del tipo de medición relacionado con la estación
        },
      },
      take: limit, // Límite de resultados por página
      skip: skip,  // Offset para paginación
      order: { created_at: 'DESC' }, // Ordenar por fecha de creación
    });
  
    return {
      data: result,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} medicion`;
  }

  update(id: number, updateMedicionDto: UpdateMedicionDto) {
    return `This action updates a #${id} medicion`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicion`;
  }

  async handleChirpstack(payload: ChirpStackPayloadDto, event: string) {
    // // Lógica para procesar el payload de ChirpStack y el parámetro event
    // const { deduplicationId, time, deviceInfo, devAddr } = payload;

    // // Ejemplo de procesamiento:
    // console.log(`Evento: ${event}`);
    // console.log(`ID de duplicación: ${deduplicationId}`);
    // console.log(`Hora: ${time}`);
    // console.log(`Información del dispositivo:`, deviceInfo);
    // console.log(`Dirección del dispositivo: ${devAddr}`);
    
    // console.log('Payload:', payload);
    // console.log('Payload.object:', payload.object);
    // console.log('Payload.object.decodedData:', payload.object.decodedData);

    // // Implementa aquí la lógica que necesites, como almacenar datos en la base de datos,
    // // realizar cálculos, etc.

    // return { message: 'Payload procesado correctamente' };
    console.log("🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑🦑")
    console.log(payload)
    console.log("👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽👽")
    const { object } = payload;
    const decodedData = object?.decodedData || '';
    const cleanDecoded = decodedData.replace(/^(\*{4}|.{3}\*)|(!{4}.*|!.*)$/g, '');

    // Dividir los datos en mediciones individuales
    const medicionesList = cleanDecoded.split('|');

    // Mapear cada medición a su tipo correspondiente
    const medicionesDict = {
      radiation: { value: parseFloat(medicionesList[0]), type: 2 },
      windSpeed: { value: parseFloat(medicionesList[1]), type: 1 },
      temperature: { value: parseFloat(medicionesList[2]), type: 5 },
      pressure: { value: parseFloat(medicionesList[3]) / 100, type: 4 },
      humidity: { value: parseFloat(medicionesList[4]), type: 3 },
      airQuality: { value: parseFloat(medicionesList[5]), type: 7 },
      altitude: { value: parseFloat(medicionesList[6]), type: 6 },
    };

    // Obtener el ID de la estación (puedes ajustarlo según tu lógica)
    const numero_serieEstacion = payload.deviceInfo.devEui;

    const estacion = await this.estacionRepository.findOne({ where: { numero_serie: numero_serieEstacion } });

    // Guardar cada medición en la base de datos
    for (const key in medicionesDict) {
      const medicionData = medicionesDict[key];
      const tipoMedicion = await this.tipoMedicionRepository.findOne({ where: { id: medicionData.type } });



      if (tipoMedicion) {

        // const medicionNueva={
        //   valor: medicionData.value,
        //   tipoMedicionId: tipoMedicion.id,
        //   estacionId: estacionId
        // } as CreateMedicionDto;
        // const medicion = this.medicionRepository.create(medicionNueva);

        if(isNaN(medicionData.value)){
          continue;
        }

        const medicion = await this.create({
          valor: medicionData.value,
          tipoMedicionId: tipoMedicion.id,
          estacionId: estacion?estacion.id:0,
        } as CreateMedicionDto);
        
        console.log(':::::::::::::::::::::::::::::::::::::::::::::::');
        console.log('Tipo de medicion:', tipoMedicion);
        console.log('Medicion:', medicion);

        //await this.medicionRepository.save(medicion);
      }
    }

    this.socketService.sendMessageToClient("STA-"+payload.deviceInfo.devEui,'data_updated',{data:"STA Data Updated"})
    
    this.socketService.sendMessageToClient("map_socket",'update_map',{data:"update map now"})

    return { message: 'Payload procesado y mediciones guardadas correctamente' };

  }

  async findHistoricoInRange(startDate: string, endDate: string, numeroSerie: string) {
    // Convertir las fechas de cadena a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Asegúrate de que las fechas sean válidas
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error('Las fechas proporcionadas no son válidas');
    }
  
    // Buscar las mediciones históricas dentro del rango de fechas y el número de serie
    const historico = await this.medicionHistoricoRepository.find({
      where: {
        created_at: Between(start, end), // Filtrar por fecha de creación entre las fechas de inicio y fin
        estacion: {
          numero_serie: numeroSerie, // Filtrar por número de serie de la estación
        },
        
      },
      relations: {
        //estacion: true,
        tipo_medicion: {
          unidad: true
        },
      },
      order: { created_at: 'ASC' }, // Ordenar por fecha de creación
    });
  
    return historico;
  }
  


  async testSocket(payload: ChirpStackPayloadDto, event: string) {
    this.socketService.sendMessageToClient(event,'chat_message',{data:"this is a message"})
    return "okkkk"
  }

}
