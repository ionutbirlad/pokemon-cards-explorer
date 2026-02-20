export const jobKeys = {
  all: ["jobs"] as const,
  byId: (jobId: string) => [...jobKeys.all, jobId] as const,
};
