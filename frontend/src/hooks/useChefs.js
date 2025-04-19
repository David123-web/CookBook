import { useQuery } from '@tanstack/react-query';
import { fetchChefsAPI, fetchChefByIdAPI } from '../api/chefs';

// ─────────────────────────────────────────────
// LIST OF CHEFS
// ─────────────────────────────────────────────
export function useChefs() {
  return useQuery({
    queryKey: ['chefs'],
    queryFn: fetchChefsAPI,

    // mock data for testing
    // queryFn: async () => [
    //   { id: 1, name: 'Chef Alice', specialty: 'Italian' },
    //   { id: 2, name: 'Chef Bob',   specialty: 'Sushi'   },
    // ],
    
    staleTime: 5 * 60 * 1000,        // optional: cache for 5 min
  });
}

// ─────────────────────────────────────────────
// SINGLE CHEF BY ID
// ─────────────────────────────────────────────
export function useChef(id) {
  return useQuery({
    queryKey: ['chef', id],
    queryFn: () => fetchChefByIdAPI(id),
    enabled: !!id,                   // don’t run until we actually have an id
    staleTime: 5 * 60 * 1000,
  });
}
