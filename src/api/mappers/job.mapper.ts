import type { Job } from "@/types/domain/job";
import type { RemoteJob } from "@/types/remote/job";

export function mapRemoteJob(remote: RemoteJob, jobId: string): Job {
  return {
    jobId,
    status: remote.status,
    progress: remote.progress,
    healthPoints: remote.health_points,
  };
}
