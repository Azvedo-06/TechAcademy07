import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '../http/http.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private http: HttpService,
  ) {}

  async login(email: string, password: string) {
    const { data: user } = await this.http.instance.get(
      `/users/email/${email}`,
    );
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciais Inválidas');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });

    return { "access_token": token};
  }
}
