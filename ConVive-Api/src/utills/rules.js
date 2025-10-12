//regras de negócio

// Um evento só pode ser criado se a data for futura
export function eventoValido(evento) {
  const hoje = new Date();
  const dataEvento = new Date(evento.date);
  return dataEvento >= hoje;
}

// Verifica se já existe evento no mesmo dia
export function existeEventoNoMesmoDia(eventos, novoEvento) {
  return eventos.some((e) => {
    const dataExistente = new Date(e.date).toISOString().split("T")[0];
    const dataNovo = new Date(novoEvento.date).toISOString().split("T")[0];
    return dataExistente === dataNovo;
  });
}

export function formatarData(date) {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const dia = String(date.getDate()).padStart(2, "0");

  return `${ano}/${mes}/${dia}`;
}

export function validarDataFormato(dateStr) {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!regex.test(dateStr)) return false;

  const [ano, mes, dia] = dateStr.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia
  );
}
