import { delay, http, HttpResponse } from "msw";

import { createJobForItem, getJobById, getPokemonById, getPokemonList } from "./db";

// base path used across handlers
const API_BASE = "/api";

export const handlers = [
  // ---- GET /api/items ----
  http.get(`${API_BASE}/items`, async () => {
    // --- Error simulations (uncomment to test) ---
    // Network error (simulates offline / connection failure)
    // return HttpResponse.error();

    // Server error (500)
    // return new HttpResponse(null, { status: 500 });

    // Empty list
    // return HttpResponse.json([]);

    // Slow response (simulates slow network, ms)
    // await delay(3000);

    const items = getPokemonList();
    return HttpResponse.json(items);
  }),

  // ---- GET /api/items/:id ----
  http.get(`${API_BASE}/items/:id`, async ({ params }) => {
    const id = params.id as string;

    // --- Error simulations (uncomment to test) ---
    // Network error
    // return HttpResponse.error();

    // Server error (500)
    // return new HttpResponse(null, { status: 500 });

    // Force 404 regardless of id
    // return new HttpResponse(null, { status: 404 });

    // Slow response
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
    // Network error
    // return HttpResponse.error();

    // Server error (500)
    // return new HttpResponse(null, { status: 500 });

    // Slow response
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
    // Network error
    // return HttpResponse.error();

    // Server error (500)
    // return new HttpResponse(null, { status: 500 });

    // Force job failed
    // return HttpResponse.json({ status: "failed", progress: 100, health_points: null });

    // Force job stuck in running
    // return HttpResponse.json({ status: "running", progress: 50, health_points: null });

    // Slow response (useful to test polling UX)
    // await delay(2000);

    const job = getJobById(jobId);
    if (!job) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(job);
  }),
];
