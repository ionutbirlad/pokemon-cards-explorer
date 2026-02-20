import { http, HttpResponse } from "msw";

import { createJobForItem, getJobById, getPokemonById, getPokemonList } from "./db";

// base path used across handlers
const API_BASE = "/api";

export const handlers = [
  // ---- GET /api/items ----
  http.get(`${API_BASE}/items`, async () => {
    const items = getPokemonList();
    return HttpResponse.json(items);
  }),

  // ---- GET /api/items/:id ----
  http.get(`${API_BASE}/items/:id`, async ({ params }) => {
    const id = params.id as string;

    const item = getPokemonById(id);
    if (!item) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(item);
  }),

  // ---- POST /api/items/:id/jobs ----
  http.post(`${API_BASE}/items/:id/jobs`, async ({ params }) => {
    const id = params.id as string;

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

    const job = getJobById(jobId);
    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(job);
  }),
];
