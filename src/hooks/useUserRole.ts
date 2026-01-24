import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type AppRole = 'admin' | 'moderator' | 'user';

interface UserRoleState {
  role: AppRole | null;
  isAdmin: boolean;
  isModerator: boolean;
  loading: boolean;
}

export function useUserRole(): UserRoleState {
  const { user } = useAuth();
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // TODO: Replace with your API call
        // const response = await fetch(`/api/users/${user.id}/role`);
        // const data = await response.json();
        // setRole(data.role);

        // Default role for now
        setRole('user');
      } catch (err) {
        console.error('Error fetching user role:', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [user]);

  return {
    role,
    isAdmin: role === 'admin',
    isModerator: role === 'moderator',
    loading,
  };
}
