import { Injectable } from '@nestjs/common';
import { CreateMedicionDto } from './dto/create-medicion.dto';
import { UpdateMedicionDto } from './dto/update-medicion.dto';
import { ChirpStackPayloadDto } from './dto/ChirpStackPayloadDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicion } from './entities/medicion.entity';
import { TipoMedicion } from 'src/tipo-medicion/entities/tipo-medicion.entity';
import { Estacion } from 'src/estacion/entities/estacion.entity';

@Injectable()
export class MedicionService {

  constructor(
    @InjectRepository(Medicion) private readonly medicionRepository: Repository<Medicion>,
    @InjectRepository(TipoMedicion) private readonly tipoMedicionRepository: Repository<TipoMedicion>,
    @InjectRepository(Estacion) private readonly estacionRepository: Repository<Estacion>,
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

        const medicion = await this.create({
          valor: medicionData.value,
          tipoMedicionId: tipoMedicion.id,
          estacionId: estacion?estacion.id:0,
        } as CreateMedicionDto);
        
        console.log(':::::::::::::::::::::::::::::::::::::::::::::::');
        console.log('Tipo de medicion:', tipoMedicion);
        console.log('Medicion:', medicion);

        await this.medicionRepository.save(medicion);
      }
    }

    return { message: 'Payload procesado y mediciones guardadas correctamente' };

  }

}
