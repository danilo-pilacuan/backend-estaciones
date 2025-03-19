import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private usuarioService:UsuarioService,
        private jwtService: JwtService){}

    async signIn(username: string, password:string):Promise<any>{
        console.log("Sign in enter")
        const user = await this.usuarioService.getUserByUserEmail(username);

        console.log(user)
        if(!user)
        {
            throw new UnauthorizedException();
        }
        if(user?.clave!==password){
            throw new UnauthorizedException();
        }

        
        const payload = {
            correo: user.correo,
            activo: user.activo,
            created_at: user.created_at,
            id: user.id,
            nombre: user.nombre,
            rol: user.rol,
            updated_at: user.updated_at,
        };
        

        

        return {
            access_token: await this.jwtService.signAsync(payload),
            usuario:payload
        }
    }



    async validateToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}


