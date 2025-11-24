import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/User.model';
import validator from 'validator';

export class ValidationsUsers {
  findUser(user: User | null) {
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  }
  findByEmail(email: User | null) {
    if (!email) {
      throw new NotFoundException('Email não encontrado');
    }
  }
  nameIsNull(name: string) {
    if (!name) {
      throw new BadRequestException('Nome é obrigatório');
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name)) {
      throw new BadRequestException('Nome deve conter apenas letras e espaços');
    }
  }
  validatePhone(phone: string) {
    if (!phone) {
      throw new BadRequestException(
        'Usuário deve ter um número de telefone cadastrado',
      );
    }

    // remove tudo que não for número
    const phoneClean = phone.replace(/\D/g, '');

    // Brasileiro válido tem 10 ou 11 dígitos (com ou sem 9)
    if (phoneClean.length !== 10 && phoneClean.length !== 11) {
      throw new BadRequestException('Telefone deve ter 10 ou 11 dígitos');
    }

    // valida com validator
    if (!validator.isMobilePhone(phoneClean, 'pt-BR')) {
      throw new BadRequestException('Telefone inválido');
    }
  }
  // validar email
  validateEmail(email: string) {
    if (!email || email.trim().length === 0) {
      throw new BadRequestException('Usuário deve ter um email cadastrado');
    }

    if (!validator.isEmail(email)) {
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
  // validar CPF
  validateCpf(cpf: string) {
    if (!cpf) {
      throw new BadRequestException('CPF é obrigatório');
    }

    // Remove tudo que não é número
    const cpfNumeros = cpf.replace(/\D/g, '');

    // Checa se possui 11 dígitos
    if (cpfNumeros.length !== 11) {
      throw new BadRequestException('CPF deve ter 11 dígitos');
    }

    // Elimina CPFs inválidos conhecidos (todos os dígitos iguais)
    if (/^(\d)\1+$/.test(cpfNumeros)) {
      throw new BadRequestException('CPF inválido');
    }

    // ---- Cálculo do 1º dígito verificador ----
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfNumeros.charAt(9))) {
      throw new BadRequestException('CPF inválido');
    }

    // ---- Cálculo do 2º dígito verificador ----
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfNumeros.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;

    if (resto !== parseInt(cpfNumeros.charAt(10))) {
      throw new BadRequestException('CPF inválido');
    }
  }
}
