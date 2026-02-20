import { useQuery } from "@tanstack/react-query";

import { fetchJobById } from "@/api/jobsApi";

import { jobKeys } from "./keys";

type JobStatus = "queued" | "running" | "done" | "failed";

export function useJob(jobId: string | undefined) {
  return useQuery({
    queryKey: jobId ? jobKeys.byId(jobId) : jobKeys.byId(""),
    queryFn: ({ signal }) => fetchJobById(jobId as string, signal),
    enabled: Boolean(jobId),
    refetchInterval: (query) => {
      const data = query.state.data as { status?: JobStatus } | undefined;
      if (!data?.status) return 1000;
      return data.status === "done" || data.status === "failed" ? false : 1000;
    },
  });
}
