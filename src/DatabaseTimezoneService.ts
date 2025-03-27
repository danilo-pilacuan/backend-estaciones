import { DataSource } from 'typeorm';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseTimezoneService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      // Consultar zona horaria actual
      const currentTimezone = await this.dataSource.query(`SHOW TimeZone;`);
      console.log('Zona horaria actual:', currentTimezone);

      // Establecer zona horaria a UTC
      await this.dataSource.query(`SET TIME ZONE 'UTC';`);
      
      console.log('Zona horaria configurada correctamente a UTC');
    } catch (error) {
      console.error('Error configurando zona horaria:', error);
    }
  }
}