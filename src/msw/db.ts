import type { RemoteJob, RemoteJobStartResponse } from "@/types/remote/job";
import type { RemotePokemonDetail, RemotePokemonListItem } from "@/types/remote/pokemon";

/**
 * Internal mock record used to simulate backend job lifecycle.
 */
type JobRecord = {
  job_id: string;
  item_id: string;
  created_at: number;
  will_fail: boolean;
  final_health_points: number;
};

export type Db = {
  pokemons: Map<string, RemotePokemonDetail>;
  relatedById: Record<string, string[]>;
  jobs: Map<string, JobRecord>;
};

const now = () => Date.now();

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Time-based state machine.
 * queued → running → done/failed.
 * Progress grows based on elapsed time.
 */
const getJobStatusSnapshot = (job: JobRecord): RemoteJob => {
  const elapsedMs = now() - job.created_at;

  if (elapsedMs < 2000) {
    return { status: "queued", progress: 0, health_points: null };
  }

  if (elapsedMs < 8000) {
    const t = (elapsedMs - 2000) / 6000;
    const progress = Math.min(99, Math.max(1, Math.floor(t * 100)));
    return { status: "running", progress, health_points: null };
  }

  if (job.will_fail) {
    return { status: "failed", progress: 100, health_points: null };
  }

  return { status: "done", progress: 100, health_points: job.final_health_points };
};

// ---- Pokemon seed (remote API shape) ----
const pokemonsSeed: RemotePokemonDetail[] = [
  {
    id: "psyduck",
    name: "Psyduck",
    subtitle: "Il Re dello Stress 🦆💥",
    card_number: "054",
    level: 15,
    health_points: 100,
    rarity: "pokemon_base",
    short_description: "Usare i suoi poteri gli causa mal di testa...",
    long_description:
      "<p>Psyduck vive in uno stato di confusione perenne.</p>" +
      "<ul><li>Mal di testa</li><li>Poteri psichici involontari</li></ul>",
    typology: { name: "acqua", icon_url: "/assets/icons/water_drop.svg", icon_name: "water_drop" },
    energy: { name: "stella", icon_url: "/assets/icons/star.svg" },
    vulnerability: { icon_url: "/assets/icons/eco.svg", value: -20 },
    extra_details: "/assets/images/general/extra_details_psyduck.png",
    image_url: "/assets/images/pokemons/psyduck.png",
  },
  {
    id: "sprigatito",
    name: "Sprigatito",
    subtitle: "Il Gatto Domestico 🌱🐱",
    card_number: "001",
    level: 12,
    health_points: 80,
    rarity: "pokemon_base",
    short_description: "Sprigatito è un germoglio con le fusa...",
    long_description:
      "<p>Sprigatito è piccolo ma testardo.</p>" +
      "<ul><li>Adora il sole</li><li>Odora di erba fresca</li></ul>",
    typology: { name: "erba", icon_url: "/assets/icons/eco.svg", icon_name: "eco" },
    energy: { name: "natura", icon_url: "/assets/icons/eco.svg" },
    vulnerability: { icon_url: "/assets/icons/local_fire_department.svg", value: -20 },
    extra_details: "/assets/images/general/extra_details_sprigatito.png",
    image_url: "/assets/images/pokemons/sprigatito.png",
  },
  {
    id: "snorlax",
    name: "Snorlax",
    subtitle: "Il boss del sonno 😴",
    card_number: "143",
    level: 18,
    health_points: 60,
    rarity: "pokemon_base",
    short_description: "Dorme tutto il giorno e si sveglia solo per mangiare.",
    long_description:
      "<p>Snorlax è una montagna con la modalità risparmio attiva.</p>" +
      "<ul><li>Se lo svegli: non farlo</li><li>Se mangia: sparisce il cibo</li></ul>",
    typology: { name: "neutro", icon_url: "/assets/icons/star.svg", icon_name: "star" },
    energy: { name: "sonno", icon_url: "/assets/icons/star.svg" },
    vulnerability: { icon_url: "/assets/icons/equalizer.svg", value: -30 },
    extra_details: "/assets/images/general/extra_details_snorlax.png",
    image_url: "/assets/images/pokemons/snorlax.png",
  },
  {
    id: "fuecoco",
    name: "Fuecoco",
    subtitle: "Coccodrillo chill 🔥",
    card_number: "909",
    level: 10,
    health_points: 40,
    rarity: "pokemon_base",
    short_description: "Coccodrillo pigro con scaglie rosse...",
    long_description:
      "<p>Fuecoco vive tranquillo.</p>" +
      "<ul><li>Scalda l'ambiente</li><li>Si dimentica cosa stava facendo</li></ul>",
    typology: {
      name: "fuoco",
      icon_url: "/assets/icons/local_fire_department.svg",
      icon_name: "local_fire_department",
    },
    energy: { name: "calore", icon_url: "/assets/icons/local_fire_department.svg" },
    vulnerability: { icon_url: "/assets/icons/water_drop.svg", value: -20 },
    extra_details: "/assets/images/general/extra_details_fuecoco.png",
    image_url: "/assets/images/pokemons/fuecoco.png",
  },
  {
    id: "magikarp",
    name: "Magikarp",
    subtitle: "Il più inutile 🐟",
    card_number: "129",
    level: 5,
    health_points: 25,
    rarity: "pokemon_base",
    short_description: "Universalmente noto come il Pokémon più inutile al mondo.",
    long_description:
      "<p>Magikarp è qui per ricordarti l'umiltà.</p>" +
      "<ul><li>Fa splash</li><li>Fa ancora splash</li></ul>",
    typology: { name: "acqua", icon_url: "/assets/icons/water_drop.svg", icon_name: "water_drop" },
    energy: { name: "onda", icon_url: "/assets/icons/water_drop.svg" },
    vulnerability: { icon_url: "/assets/icons/equalizer.svg", value: -30 },
    extra_details: "/assets/images/general/extra_details_psyduck.png",
    image_url: "/assets/images/pokemons/magikarp.png",
  },
  {
    id: "diglett",
    name: "Diglett",
    subtitle: "Solo testa 🕳️",
    card_number: "050",
    level: 8,
    health_points: 15,
    rarity: "pokemon_base",
    short_description: "Di lui emerge solo la testa tonda con il naso rosa.",
    long_description:
      "<p>Diglett è un mistero geologico.</p>" +
      "<ul><li>È sempre a metà</li><li>Il resto è NDA</li></ul>",
    typology: { name: "terra", icon_url: "/assets/icons/eco.svg", icon_name: "eco" },
    energy: { name: "scavo", icon_url: "/assets/icons/eco.svg" },
    vulnerability: { icon_url: "/assets/icons/water_drop.svg", value: -20 },
    extra_details: "/assets/images/general/extra_details_psyduck.png",
    image_url: "/assets/images/pokemons/diglett.jpg",
  },
];

// Include some missing ids to simulate 404 on related click
const relatedById: Record<string, string[]> = {
  psyduck: ["sprigatito", "snorlax", "missing-1", "missing-2"],
  sprigatito: ["psyduck", "fuecoco", "missing-3"],
  snorlax: ["psyduck", "diglett", "missing-4"],
  fuecoco: ["sprigatito", "magikarp", "missing-5"],
  magikarp: ["psyduck", "diglett", "missing-6"],
  diglett: ["snorlax", "magikarp", "missing-7"],
};

export const db: Db = {
  pokemons: new Map(pokemonsSeed.map((p) => [p.id, p])),
  relatedById,
  jobs: new Map(),
};

// ---- Pokemon helpers ----

export const getPokemonList = (): RemotePokemonListItem[] =>
  Array.from(db.pokemons.values()).map((p) => ({
    id: p.id,
    name: p.name,
    short_description: p.short_description,
    image_url: p.image_url,
  }));

export const getPokemonById = (id: string): RemotePokemonDetail | undefined => db.pokemons.get(id);

export const getRelatedIds = (id: string): string[] => db.relatedById[id] ?? [];

export const updatePokemonHealthPoints = (id: string, nextHp: number) => {
  const current = db.pokemons.get(id);
  if (!current) return;
  db.pokemons.set(id, { ...current, health_points: nextHp });
};

// ---- Job helpers ----

const createJobId = () => `job_${Math.random().toString(16).slice(2)}_${now()}`;

/**
 * Creates a job linked to an item.
 * Failure and final HP are decided once at creation.
 */
export const createJobForItem = (itemId: string): RemoteJobStartResponse => {
  const job_id = createJobId();

  const record: JobRecord = {
    job_id,
    item_id: itemId,
    created_at: now(),
    will_fail: Math.random() < 0.15,
    final_health_points: randomInt(0, 100),
  };

  db.jobs.set(job_id, record);

  return { job_id };
};

/**
 * Returns current job snapshot.
 * When done, update the item HP in the mock db.
 */
export const getJobById = (jobId: string): RemoteJob | undefined => {
  const job = db.jobs.get(jobId);
  if (!job) return undefined;

  const snapshot = getJobStatusSnapshot(job);

  if (snapshot.status === "done" && snapshot.health_points != null) {
    updatePokemonHealthPoints(job.item_id, snapshot.health_points);
  }

  return snapshot;
};
