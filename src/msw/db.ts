import type { RemoteJob, RemoteJobStartResponse } from "@/types/remote/job";
import type { RemotePokemonDetail, RemotePokemonListItem } from "@/types/remote/pokemon";

/**
 * TYPES
 */

/**
 * Internal mock record used to simulate backend job lifecycle.
 */
type JobRecord = {
  job_id: string;
  item_id: string;
  created_at: number;
  will_fail: boolean;
  fail_at_progress: number | null;
  final_health_points: number;
};

export type Db = {
  pokemons: Map<string, RemotePokemonDetail>;
  jobs: Map<string, JobRecord>;
};

/**
 * UTILS
 */

const now = () => Date.now();
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * HELPERS
 */

const createJobId = () => `job_${Math.random().toString(16).slice(2)}_${now()}`;
export const updatePokemonHealthPoints = (id: string, nextHp: number) => {
  const current = db.pokemons.get(id);
  if (!current) return;
  db.pokemons.set(id, { ...current, health_points: nextHp });
};

/**
 * DATABSE
 */

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
    long_description: `<p>Psyduck vive in uno stato di confusione perenne. Praticamente è il simbolo universale del "non ho capito la domanda".</p><ul><li>Il suo superpotere? L'emicrania. Più gli scoppia la testa, più diventa un dio dei poteri psichici.</li><li>Il dramma: Appena finisce di lanciare attacchi devastanti, si dimentica tutto e torna a fissare il vuoto come se non fosse successo nulla.</li></ul><p>In breve: vive con le mani sulle tempie, non sa dove si trova, ma se lo fai arrabbiare ti sposta le montagne con il pensiero. Un eroe moderno.</p>`,
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
    long_description: `<p>Sprigatito vive per un solo scopo: essere adorato.</p><ul><li>Il suo superpotere? L'aromaterapia forzata. Praticamente ti sconfigge a colpi di profumatore per ambienti.</li><li>Il dramma: Se smetti di accarezzarlo anche solo per un secondo, entra in modalità "offesa profonda".</li></ul><p>In breve: è una piantina adorabile con crisi di protagonismo. Ti guarda con quegli occhioni dolci, ma dentro sta solo pensando a come farti diventare il suo cameriere personale. Un piccolo tiranno verde.</p>`,
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
    long_description: `<p>Il suo superpotere? Lo stomaco. Può mangiare quintali di cibo (anche avariato) e digerire tutto senza fare una piega. È una specie di buco nero con la pelliccia.</p><p>Il dramma: Non si sveglia per nulla al mondo. Puoi saltargli sulla pancia o suonargli un'orchestra nelle orecchie, ma se non tiri fuori un Flauto Pokémon, lui resta lì a bloccare la strada a tutti.</p><p>In breve: mangia, dorme, occupa tutto il marciapiede e non paga l'affitto. Fondamentalmente, vive la vita che tutti vorremmo avere il lunedì mattina. Un mito assoluto.</p>`,
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
    long_description: `<p>Fuecoco vive in uno stato di beatitudine totale, principalmente perché nel suo cervello non sta succedendo assolutamente nulla.</p><ul><li>Il suo superpotere? La fotosintesi... ma al contrario. Sta fermo a scaldarsi al sole finché non diventa un termosifone vivente.</li><li>Il dramma: Ha la soglia di attenzione di un sasso. Se vede del cibo, dimentica istantaneamente chi sei, dove si trova e perché stava combattendo.</li></ul><p>In breve: è adorabile, calmo e terribilmente lento a capire le battute. Un coraggioso eroe pigro.</p>`,
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

/**
 * DB EXPORT
 * Defined before API helpers to keep initialization order explicit.
 * (No real TDZ risk here — functions reference `db` but do not execute before initialization.)
 */

export const db: Db = {
  pokemons: new Map(pokemonsSeed.map((p) => [p.id, p])),
  jobs: new Map(),
};

/**
 * FUNCTIONS USED BY APIs
 */

// ---- Pokemon ----

export const getPokemonList = (): RemotePokemonListItem[] =>
  Array.from(db.pokemons.values()).map((p) => ({
    id: p.id,
    name: p.name,
    short_description: p.short_description,
    image_url: p.image_url,
  }));

export const getPokemonById = (id: string): RemotePokemonDetail | undefined => db.pokemons.get(id);

// ---- Job ----

/**
 * Creates a job linked to an item.
 * Failure and final HP are decided once at creation.
 */
export const createJobForItem = (itemId: string): RemoteJobStartResponse => {
  const job_id = createJobId();

  const will_fail = Math.random() < 0.15;
  const currentPokemon = db.pokemons.get(itemId);
  const currentHp = currentPokemon?.health_points ?? 100;

  const record: JobRecord = {
    job_id,
    item_id: itemId,
    created_at: now(),
    will_fail,
    fail_at_progress: will_fail ? randomInt(5, 95) : null,
    final_health_points: Math.max(0, currentHp - randomInt(5, 40)),
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

/**
 * JOB WORKER SIMULATOR
 */

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

    if (job.will_fail && job.fail_at_progress != null && progress >= job.fail_at_progress) {
      return { status: "failed", progress, health_points: null };
    }

    return { status: "running", progress, health_points: null };
  }

  return { status: "done", progress: 100, health_points: job.final_health_points };
};
