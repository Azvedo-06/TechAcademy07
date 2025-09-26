//regras de negócio

// Um evento só pode ser criado se a data for futura
export function eventoValido(evento) {
  const hoje = new Date();
  const dataEvento = new Date(evento.date);
  return dataEvento >= hoje;
}

// Verifica se já existe evento no mesmo dia
export function existeEventoNoMesmoDia(eventos, novoEvento) {
  return eventos.some(e => {
    const dataExistente = new Date(e.date).toISOString().split('T')[0];
    const dataNovo = new Date(novoEvento.date).toISOString().split('T')[0];
    return dataExistente === dataNovo;
  });
}

