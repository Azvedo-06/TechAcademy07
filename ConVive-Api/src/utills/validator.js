// regras de validação (Cpf, campos obrigatórios)

// Aceita CPF só com números (11 dígitos) ou no formato 000.000.000-00
export function validarCPF(cpf) {
  const regex = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;
  return regex.test(cpf);
}

// Valida se nome não está vazio
export function validarNome(nome) {
  return nome && nome.trim().length > 2;
}

// Valida telefone
export function validarTelefone(telefone) {
  const regex = /^(\+55)?\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return regex.test(telefone);
}