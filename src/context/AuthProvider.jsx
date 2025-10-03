import React, { useState, useRef, useEffect, useCallback, use } from "react";
import { checkSession } from "../api/authAPI";
import { AuthContext } from "./AuthContext";
import { loginWithEmailAndPassword, signupWithEmailAndPassword, logoutUser } from "../services/authService";


function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    authenticate: false,
    loading: true,
    error: null,
  });

  const isMountedRef = useRef(true);
  const isCheckingRef = useRef(false);
  const sessionCheckIntervalRef = useRef(null);

  // Cleanup function
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current);
      }
    };
  }, []);

  /**
   * Update auth state safely
   */
  const updateState = useCallback((updates) => {
    if (isMountedRef.current) {
      setState((prev) => ({ ...prev, ...updates }));
    }
  }, []);

  /**
   * Check session with retry logic
   */
  const checkUserSession = useCallback(async (retryCount = 0) => {
    if (isCheckingRef.current || !isMountedRef.current) {
      return;
    }

    isCheckingRef.current = true;
    const MAX_RETRIES = 3;

    try {
      const response = await checkSession();
      console.log("API Response:", response);

      if (!isMountedRef.current) return;

      if (response?.success && response?.data) {
        updateState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        console.log("User session valid:", response.data);
      } else {
        updateState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error checking user session:", error);

      if (!isMountedRef.current) return;

      // Retry logic for network errors
      if (
        retryCount < MAX_RETRIES &&
        (error.code === "NETWORK_ERROR" || !error.response)
      ) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        setTimeout(() => {
          isCheckingRef.current = false;
          checkUserSession(retryCount + 1);
        }, delay);
        return;
      }
      updateState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message,
      });
    } finally {
      isCheckingRef.current = false;
    }
  }, []);

  /**
   * Initial session check
   */
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  /**
   * Periodic session check
   */
  useEffect(() => {
    if (state.isAuthenticated) {
      sessionCheckIntervalRef.current = setInterval(() => {
        checkSession();
      }, 5 * 60 * 1000); // Every 5 minutes

      return () => {
        if (sessionCheckIntervalRef.current) {
          clearInterval(sessionCheckIntervalRef.current);
        }
      };
    }
  }, [state.isAuthenticated, checkSession]);


    /**
   * Login
   */
  const login = useCallback(async (email, password) => {
    updateState({ isLoading: true, error: null });

    try {
      const user = await loginWithEmailAndPassword(email, password);
      updateState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      return { success: true, user };
    } catch (error) {
      updateState({
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  }, [updateState]);

   /**
   * Signup
   */
  const signup = useCallback(async (email, password, displayName) => {
    updateState({ isLoading: true, error: null });

    try {
      const user = await signupWithEmailAndPassword(email, password, displayName);
      
      updateState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return { success: true, user };
    } catch (error) {
      updateState({
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  }, [updateState]);

   /**
   * Logout
   */
  const logout = useCallback(async () => {
    try {
      await logoutUser();

      updateState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });

      return { success: true };
    } catch (error) {
      // Clear state even if logout fails
      updateState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
      });
      
      return { success: false, error: error.message };
    }
  }, [updateState]);

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  /**
   * Refresh session
   */
  const refreshSession = useCallback(() => {
    updateState({ isLoading: true, error: null });
    checkSession();
  }, [updateState, checkSession]);

  const contextValue = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    signup,
    logout,
    clearError,
    refreshSession,
  };

  console.log("AuthProvider context:", contextValue);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
