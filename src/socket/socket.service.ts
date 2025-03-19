import { Injectable } from '@nestjs/common';
import { AppGateway } from './../app.gateway';


@Injectable()
export class SocketService {
    constructor(private readonly appGateway: AppGateway) {}

    sendMessageToClient(customId: string, event: string, message: any) {
      console.log('sending to:::::::::::::::::')
      console.log(customId)
        this.appGateway.emitToClient(customId, event, message);
      }
}
