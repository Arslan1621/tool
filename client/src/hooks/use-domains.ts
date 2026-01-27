import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type ScanInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

// ============================================
// DOMAIN HOOKS
// ============================================

export function useDomains() {
  return useQuery({
    queryKey: [api.domains.list.path],
    queryFn: async () => {
      const res = await fetch(api.domains.list.path);
      if (!res.ok) throw new Error("Failed to fetch recent scans");
      return api.domains.list.responses[200].parse(await res.json());
    },
  });
}

export function useDomain(domain: string) {
  return useQuery({
    queryKey: [api.domains.get.path, domain],
    enabled: !!domain && domain.length > 0,
    queryFn: async () => {
      const url = buildUrl(api.domains.get.path, { domain });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch domain report");
      
      return api.domains.get.responses[200].parse(await res.json());
    },
    retry: false,
  });
}

export function useRunScan() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  return useMutation({
    mutationFn: async (data: ScanInput) => {
      // Validate locally first just in case
      const validated = api.domains.scan.input.parse(data);
      
      const res = await fetch(api.domains.scan.path, {
        method: api.domains.scan.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.domains.scan.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 500) {
          throw new Error("Server error during scan. Please try again.");
        }
        throw new Error("Failed to run scan");
      }

      return api.domains.scan.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [api.domains.list.path] });
      queryClient.setQueryData([api.domains.get.path, data.domain], data);
      
      toast({
        title: "Scan Complete",
        description: `Successfully analyzed ${data.domain}`,
      });
      
      // Navigate to the report page
      setLocation(`/${data.domain}`);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: error.message,
      });
    },
  });
}
