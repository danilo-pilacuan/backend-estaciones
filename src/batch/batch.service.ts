import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  // Ejecuta cada minuto usando una expresión cron
  // @Cron(CronExpression.EVERY_MINUTE)
  // handleCron() {
  //   this.logger.log('Tarea ejecutada cada minuto 🎃🎃🎃🎃🎃🎃🎃');
  // }

  // @Cron('17 1 * * *')
  // handleSpecificTimeCron() {
  //   this.logger.log('Tarea ejecutada todos los días a la 1:17 AM 🤢🤢🤢🤢🤢🤢🤢');
  // }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleMidnightCron() {
    this.logger.log('Tarea ejecutada a las 12:00 AM (medianoche)');
  }

  // Ejecuta cada 10 segundos usando intervalos
  // @Interval(10000) // Intervalo en milisegundos
  // handleInterval() {
  //   this.logger.log('Tarea ejecutada cada 10 segundos 😈😈😈😈😈😈');
  // }

  // Ejecuta después de un retraso específico al inicio
  // @Timeout(5000) // Ejecuta después de 5 segundos
  // handleTimeout() {
  //   this.logger.log('Tarea ejecutada una vez después de 5 segundos 🤡🤡🤡🤡🤡🤡🤡');
  // }
}
