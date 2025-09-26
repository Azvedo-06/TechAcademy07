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

// ---- Eventos ---- //
export async function getEvents() {
  const res = await fetchWithTimeout(`${API_URL}/eventos`, { timeout: 8000 });
  return handleResponse(res);
}

export async function createEvent(event) {
  try {
    const res = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erro: ${text}`);
    }

    return await res.json();
  } catch (err) {
    console.error("[createEvent] Erro:", err);
    throw err;
  }
}

// ---- Informativos ---- //
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