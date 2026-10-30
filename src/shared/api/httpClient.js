import { env } from "@/shared/config";

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

/* Thin fetch wrapper: base URL from env, JSON in/out, typed errors.
   Entity/feature `api/` modules call this; pages never call fetch directly. */
async function request(path, { method = "GET", body, headers, signal } = {}) {
  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    method,
    signal,
    headers: { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(`${method} ${path} failed with ${res.status}`, res.status, data);
  return data;
}

export const httpClient = {
  get:    (path, opts) => request(path, { ...opts, method: "GET" }),
  post:   (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put:    (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
