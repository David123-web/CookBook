import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTagsAPI,
  addUserTagAPI,
  removeUserTagAPI,
  updateProfileAPI,
} from '../api/users';

// ─────────────────────────────────────────────
// 1) Fetch all tags for a multi‑select dropdown
export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: fetchTagsAPI,
    staleTime: 5 * 60 * 1000,
  });
}

// ─────────────────────────────────────────────
// 2) Add a tag to the current user
export function useAddUserTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['tags', 'add'],
    mutationFn: ({ tagName, profileId }) =>
      addUserTagAPI(tagName, profileId),
    onSuccess: () => {
      // refetch the user itself so selectors see new tag
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

// ─────────────────────────────────────────────
// 3) Remove a tag from the current user
export function useRemoveUserTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['tags', 'remove'],
    mutationFn: ({ userTagId, userId }) =>
      removeUserTagAPI(userTagId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['me'] });
    },
  });
}

// ─────────────────────────────────────────────
// 4) Update full profile (name, bio, etc.)
export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['profile', 'update'],
    mutationFn: (profileData) => updateProfileAPI(profileData),
    onSuccess: (updated) => {
      // update the 'me' cache so AuthContext stays in sync
      qc.setQueryData(['me'], updated);
    },
  });
}