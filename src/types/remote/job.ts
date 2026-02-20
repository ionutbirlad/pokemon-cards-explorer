export type RemoteJobStatus = "queued" | "running" | "done" | "failed";

export type RemoteJobStartResponse = {
  job_id: string;
};

export type RemoteJob = {
  status: RemoteJobStatus;
  progress: number;
  health_points: number | null;
};
