import { delay, http, HttpResponse } from "msw";

import { createJobForItem, getJobById, getPokemonById, getPokemonList } from "./db";

// base path used across handlers
const API_BASE = "/api";

export const handlers = [
  // ---- GET /api/items ----
  http.get(`${API_BASE}/items`, async () => {
    // --- Error simulations (uncomment to test) ---
    // Network error → GLOBALE
    // return HttpResponse.error();

    // Server error (500) → GLOBALE
    // return HttpResponse.json({ message: "Internal server error." }, { status: 500 });

    // Not found (404) → LOCALE
    // return HttpResponse.json({ message: "Pokemon not found." }, { status: 404 });

    // Unauthorized (401) → LOCALE
    // return HttpResponse.json({ message: "Unauthorized. Please login." }, { status: 401 });

    // Forbidden (403) → LOCALE
    // return HttpResponse.json({ message: "You don't have permission to access this resource." }, { status: 403 });

    // Unprocessable (422) → LOCALE
    // return HttpResponse.json({ message: "Invalid request payload." }, { status: 422 });

    // Slow response → non è un errore, testa loading UX
    // await delay(3000);

    const items = getPokemonList();
    return HttpResponse.json(items);
  }),

  // ---- GET /api/items/:id ----
  http.get(`${API_BASE}/items/:id`, async ({ params }) => {
    const id = params.id as string;

    // --- Error simulations (uncomment to test) ---
    // Network error → GLOBAL
    // return HttpResponse.error();

    // Server error (500) → GLOBAL
    // return new HttpResponse(null, { status: 500 });

    // Not found (404) → LOCAL (redirect a NotFoundPage)
    // return new HttpResponse(null, { status: 404 });

    // Unauthorized (401) → LOCAL
    // return new HttpResponse(null, { status: 401 });

    // Forbidden (403) → LOCAL
    // return new HttpResponse(null, { status: 403 });

    // Abort (navigazione via prima del completamento) → ignorato, non mostrare nulla
    // Non simulabile via MSW, avviene naturalmente navigando via durante il fetch

    // Slow response → non è un errore, testa loading UX
    // await delay(3000);

    const item = getPokemonById(id);
    if (!item) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(item);
  }),

  // ---- POST /api/items/:id/jobs ----
  http.post(`${API_BASE}/items/:id/jobs`, async ({ params }) => {
    const id = params.id as string;

    // --- Error simulations (uncomment to test) ---
    // Network error → GLOBAL
    // return HttpResponse.error();

    // Server error (500) → GLOBAL
    // return new HttpResponse(null, { status: 500 });

    // Not found (404) → LOCAL (pokemon non esiste)
    // return new HttpResponse(null, { status: 404 });

    // Unauthorized (401) → LOCAL
    // return new HttpResponse(null, { status: 401 });

    // Unprocessable (422) → LOCAL (payload non valido)
    // return new HttpResponse(null, { status: 422 });

    // Slow response → non è un errore, testa loading UX
    // await delay(3000);

    const item = getPokemonById(id);
    if (!item) {
      return new HttpResponse(null, { status: 404 });
    }

    const job = createJobForItem(id);
    return HttpResponse.json(job, { status: 201 });
  }),

  // ---- GET /api/jobs/:job_id ----
  http.get(`${API_BASE}/jobs/:job_id`, async ({ params }) => {
    const jobId = params.job_id as string;

    // --- Error simulations (uncomment to test) ---
    // Network error → GLOBAL
    // return HttpResponse.error();

    // Server error (500) → GLOBAL
    // return new HttpResponse(null, { status: 500 });

    // Not found (404) → LOCAL (job non esiste)
    // return new HttpResponse(null, { status: 404 });

    // Force job failed → LOCAL (esito del combattimento)
    // return HttpResponse.json({ status: "failed", progress: 100, health_points: null });

    // Force job stuck in running → non è un errore, testa polling UX
    // return HttpResponse.json({ status: "running", progress: 50, health_points: null });

    // Force job queued → non è un errore, testa stato iniziale
    // return HttpResponse.json({ status: "queued", progress: 0, health_points: null });

    // Slow response → non è un errore, testa polling UX
    // await delay(2000);

    const job = getJobById(jobId);
    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(job);
  }),
];
