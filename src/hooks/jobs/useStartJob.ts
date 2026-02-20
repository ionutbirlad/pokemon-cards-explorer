import { useMutation } from "@tanstack/react-query";

import { startItemJob } from "@/api/jobsApi";

export function useStartJob() {
  return useMutation({
    mutationFn: ({ itemId }: { itemId: string }) => startItemJob(itemId),
  });
}
