import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class AuthGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload); 
   return "hello"
  }
}
