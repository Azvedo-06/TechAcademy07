import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { JwtStrategy } from '../auth/jwt.strategy';
import { HttpModule } from 'src/http/http.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'convive_secret',
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}