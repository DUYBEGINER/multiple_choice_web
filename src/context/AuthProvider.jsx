import React, { useState, useRef, useEffect, useCallback, use } from "react";
import { checkSession } from "../api/authAPI";
import {AuthContext} from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = chưa đăng nhập
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMountedRef = useRef(true);
  const retryTimeoutRef = useRef(null);


   // Cleanup function
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);


  const checkUserSession = useCallback(async (retryCount = 0) => {
    const MAX_RETRIES = 3;

    try{
      const response = await checkSession("AuthProvider");
      console.log("API Response:", response);
      if (!isMountedRef.current) return;

      if(response?.success && response?.data){
        setUser(response.data);
        setError(null);
        console.log("User session valid:", response.data);
      }else{
        console.log("No valid user session"); 
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
        
        setUser(null);
        setError(error.message);
    } finally {
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
    setError(null);
    checkUserSession();
  }, [checkUserSession]);


  const contextValue = {
    user,
    loading,
    error,
    setUser,
    clearError,
    refreshSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
