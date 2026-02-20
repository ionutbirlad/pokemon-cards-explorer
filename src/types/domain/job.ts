export type JobStatus = "queued" | "running" | "done" | "failed";

export type Job = {
  jobId: string;
  status: JobStatus;
  progress: number;
  healthPoints: number | null;
};
