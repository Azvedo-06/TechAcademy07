import { API_URL } from "./config";

async function fetchWithTimeout(resource, { timeout = 8000, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

async function handleResponse(res) {
  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = json?.message || `Erro HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json;
}

// ---- Endpoints ---- //

export async function getUsers() {
  const res = await fetchWithTimeout(`${API_URL}/usuarios`, { timeout: 8000 });
  return handleResponse(res);
}

export async function getEvents() {
  const res = await fetchWithTimeout(`${API_URL}/eventos`, { timeout: 8000 });
  return handleResponse(res);
}

export async function getInformativos() {
  const res = await fetchWithTimeout(`${API_URL}/informativos`, { timeout: 8000 });
  return handleResponse(res);
}

export async function getEspacos() {
  const res = await fetchWithTimeout(`${API_URL}/espacos`, { timeout: 8000 });
  return handleResponse(res);
}

export async function getAtividades() {
  const res = await fetchWithTimeout(`${API_URL}/atividades`, { timeout: 8000 });
  return handleResponse(res);
}