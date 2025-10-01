import React, { useState, useRef, useEffect, useCallback, use } from "react";
import { checkSession } from "../api/authAPI";
import {AuthContext} from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [authenticate, setAuthenticate] = useState(false); // false = chưa xác thực
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef(null);

  console.log("user", user);

   // Cleanup function
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;  
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  console.log("loading", loading);

  const checkUserSession = useCallback(async (retryCount = 0) => {
    const MAX_RETRIES = 3;

    try{
      const response = await checkSession();
      console.log("API Response:", response);
      if (!isMountedRef.current) return;
      if(response?.success && response?.data){
        setUser(response.data);
        setAuthenticate(true);
        setError(null);
        console.log("User session valid:", response.data);
      }else{
        console.log("No valid user session"); 
        setAuthenticate(false);
        setUser(null);
        setError(null);
      }

    } catch (error) {
      console.error("Error checking user session:", error);

      if (!isMountedRef.current) return;
      
        // Retry logic for network errors
        if (retryCount < MAX_RETRIES && error.code === 'NETWORK_ERROR') {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          retryTimeoutRef.current = setTimeout(() => {
            checkUserSession(retryCount + 1);
          }, retryDelay);
          return;
        } 
        setAuthenticate(false);
        setUser(null);
        setError(error.message);
    } finally {
      console.log("Finalizing session check", isMountedRef.current);
      if (isMountedRef.current) {
        console.log("Setting loading to false"); // Thêm log này
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refreshSession = useCallback(() => {
    setLoading(true);
    setUser(null);
    setAuthenticate(false);
    setError(null);
    checkUserSession();
  }, [checkUserSession]);


  const contextValue = {
    user,
    loading,
    authenticate,
    error,
    setUser,
    setAuthenticate,
    clearError,
    refreshSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
