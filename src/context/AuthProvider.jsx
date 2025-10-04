import React, { useState, useRef, useEffect, useCallback } from "react";
import { checkSession } from "../api/authAPI";
import { AuthContext } from "./AuthContext";
import { loginWithEmailAndPassword, signupWithEmailAndPassword, logoutUser } from "../services/authService";


function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    authenticate: false,
    loading: false,
    error: null,
  });

  const isMountedRef = useRef(true);
  const isCheckingRef = useRef(false);
 
  console.log("isMounted: ", isMountedRef.current);
  console.log("isChecking: ", isCheckingRef.current);

  // Cleanup function
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
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
  const checkUserSession = useCallback(async () => {
    console.log("[CHECK USER SESSION] isMounted: ", isMountedRef.current);
    console.log("[CHECK USER SESSION] isChecking: ", isCheckingRef.current);
    if (isCheckingRef.current || !isMountedRef.current) {
      console.log("err")
      return;
    }
    console.log("Checking user session");
    isCheckingRef.current = true;

    try {
      const response = await checkSession();
      console.log("API Response:", response);

      if (!isMountedRef.current) return;

      if (response?.success && response?.data) {
        updateState({
          user: response.data,
          authenticate: true,
          loading: false,
          error: null,
        });
        console.log("User session valid:", response.data);
      } else {
        console.log("No valid user session");
        updateState({
          user: null,
          authenticate: false,
          loading: false,
          error: null,
        });
      }
    } catch (error) {
      console.error("Error checking user session:", error);

      if (!isMountedRef.current) return;

      updateState({
        user: null,
        authenticate: false,
        loading: false,
        error: error.message,
      });
    } finally {
      isCheckingRef.current = false;
    }
  }, [updateState]);

  /**
   * Initial session check
   */
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  /**
  * Login
  */
  const login = useCallback(async (email, password) => {
    updateState({ loading: true, error: null });

    try {
      const user = await loginWithEmailAndPassword(email, password);
      updateState({
        user,
        authenticate: true,
        loading: false,
        error: null
      });
      return { success: true, user };
    } catch (error) {
      updateState({
        loading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  }, [updateState]);

   /**
   * Signup
   */
  const signup = useCallback(async (email, password, displayName) => {
    updateState({ loading: true, error: null });

    try {
      const user = await signupWithEmailAndPassword(email, password, displayName);
      
      updateState({
        user,
        authenticate: true,
        loading: false,
        error: null
      });

      return { success: true, user };
    } catch (error) {
      updateState({
        loading: false,
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
        authenticate: false,
        loading: false,
        error: null
      });

      return { success: true };
    } catch (error) {
      // Clear state even if logout fails
      updateState({
        user: null,
        authenticate: false,
        loading: false,
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
    updateState({ loading: true, error: null });
    checkUserSession();
  }, [updateState, checkUserSession]);

  const contextValue = {
    user: state.user,
    authenticate: state.authenticate,
    loading: state.loading,
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
