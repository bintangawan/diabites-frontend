/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, configureApiAuth, userApi } from '../services/api';

const AUTH_STORAGE_KEY = 'diabites_auth';
const EMPTY_SESSION = { accessToken: '', refreshToken: '' };

const UserContext = createContext(null);

const readStoredSession = () => {
  if (typeof window === 'undefined') {
    return EMPTY_SESSION;
  }

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return EMPTY_SESSION;
    }

    const parsed = JSON.parse(raw);
    return {
      accessToken: parsed.accessToken || '',
      refreshToken: parsed.refreshToken || '',
    };
  } catch {
    return EMPTY_SESSION;
  }
};

const persistSession = (session) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session.accessToken || !session.refreshToken) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(readStoredSession);
  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(() => {
    const storedSession = readStoredSession();
    return Boolean(storedSession.accessToken && storedSession.refreshToken);
  });

  const isAuthenticated = Boolean(session.accessToken && session.refreshToken);

  const clearSession = useCallback(() => {
    setSession(EMPTY_SESSION);
    setProfile(null);
    setDashboard(null);
    persistSession(EMPTY_SESSION);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('diabites_scan_draft');
    }
  }, []);

  const hydrateUser = useCallback(async () => {
    const [me, dashboardData] = await Promise.all([
      userApi.getMe(),
      userApi.getDashboard(),
    ]);

    setProfile(me);
    setDashboard(dashboardData);

    return { me, dashboardData };
  }, []);

  const updateSessionTokens = useCallback((tokens) => {
    setSession((current) => {
      const nextSession = {
        accessToken: tokens.accessToken || current.accessToken,
        refreshToken: tokens.refreshToken || current.refreshToken,
      };

      persistSession(nextSession);
      return nextSession;
    });
  }, []);

  useEffect(() => {
    configureApiAuth({
      getAccessToken: () => session.accessToken,
      getRefreshToken: () => session.refreshToken,
      onTokensUpdated: updateSessionTokens,
      onUnauthorized: clearSession,
    });
  }, [clearSession, session.accessToken, session.refreshToken, updateSessionTokens]);

  useEffect(() => {
    let isMounted = true;
    const storedSession = readStoredSession();

    if (!storedSession.accessToken || !storedSession.refreshToken) {
      return () => {
        isMounted = false;
      };
    }

    const bootstrap = async () => {
      try {
        await hydrateUser();
      } catch {
        if (isMounted) {
          clearSession();
        }
      } finally {
        if (isMounted) {
          setIsBootstrapping(false);
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [clearSession, hydrateUser]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    const nextSession = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };

    setSession(nextSession);
    persistSession(nextSession);

    try {
      const hydrated = await hydrateUser();
      setIsBootstrapping(false);
      return {
        ...data,
        ...hydrated,
      };
    } catch (error) {
      clearSession();
      throw error;
    }
  };

  const registerAndLogin = async (payload) => {
    await authApi.register(payload);
    return login({ email: payload.email, password: payload.password });
  };

  const logout = async () => {
    try {
      if (session.refreshToken) {
        await authApi.logout(session.refreshToken);
      }
    } finally {
      clearSession();
    }
  };

  const refreshProfile = async () => {
    const me = await userApi.getMe();
    setProfile(me);
    return me;
  };

  const refreshDashboard = async () => {
    const dashboardData = await userApi.getDashboard();
    setDashboard(dashboardData);
    return dashboardData;
  };

  const updateProfile = async ({ name, photo }) => {
    const updatedUser = await userApi.updateMe({ name, photo });

    setProfile((current) => ({
      ...(current || {}),
      ...updatedUser,
      healthProfile: current?.healthProfile || null,
    }));

    setDashboard((current) => (
      current
        ? {
            ...current,
            user: {
              ...current.user,
              name: updatedUser.name,
              profilePhoto: updatedUser.profilePhoto,
            },
          }
        : current
    ));

    return updatedUser;
  };

  const saveHealthProfile = async (payload) => {
    const healthProfile = await userApi.upsertHealthProfile(payload);

    setProfile((current) => ({
      ...(current || {}),
      healthProfile,
    }));

    await refreshDashboard();
    return healthProfile;
  };

  const changePassword = async (payload) => userApi.changePassword(payload);

  const userProfile = useMemo(() => {
    const baseUser = profile || dashboard?.user || null;
    if (!baseUser) {
      return null;
    }

    const healthProfile = profile?.healthProfile || dashboard?.healthProfile || null;
    return {
      ...baseUser,
      ...(healthProfile || {}),
      healthProfile,
    };
  }, [dashboard, profile]);

  return (
    <UserContext.Provider
      value={{
        session,
        profile,
        dashboard,
        userProfile,
        isAuthenticated,
        isBootstrapping,
        login,
        registerAndLogin,
        logout,
        refreshProfile,
        refreshDashboard,
        updateProfile,
        saveHealthProfile,
        changePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
