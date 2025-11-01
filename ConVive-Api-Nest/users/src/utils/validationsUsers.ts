import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/User.model';
import validator from 'validator';

export class ValidationsUsers {
  findUser(user: User | null) {
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }
  }
  findByEmail(email: User | null) {
    if (!email) {
      throw new NotFoundException("Email não encontrado");
    }
  }
  nameIsNull(name: string) {
    if (!name) {
      throw new BadRequestException('Nome é obrigatório');
    }
    if (validator.isAlpha(name) === false) {
      throw new BadRequestException('Nome deve ter somente letras');
    }
  }
  validatePhone(phone: string) {
    if (!phone) {
      throw new BadRequestException(
        'Usuário deve ter um número de telefone cadastrado',
      );
    }
    if (validator.isMobilePhone(phone, 'pt-BR') === false) {
      throw new BadRequestException('Telefone inválido');
    }
  }
  // validar se o cpf está valido
  validateCpf(cpf: string) {
    // tirar os "." e "-" deixa só os numeros
    const cpfNumeros = cpf.replace(/\D/g, '');
    // testa se tem 11 numeros
    if (!/^\d{11}$/.test(cpfNumeros)) {
      throw new BadRequestException('CPF deve ter 11 dígitos numéricos');
    }
  }
  // validar email
  validateEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Usuário deve ter um email cadastrado');
    }
    if (validator.isEmail(email) === false) {
      throw new BadRequestException('Email inválido');
    }
  }
  // validar se tem a senha e se ela é maior que 6
  validatePassword(password: string) {
    if (!password) {
      throw new BadRequestException('Usuário deve conter senha');
    }
    if (password.length < 6) {
      throw new BadRequestException('Senha deve ter no mínimo 6 caracteres');
    }
  }
}
