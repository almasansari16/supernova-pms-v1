import { createContext, useContext, useState } from "react";
import { STORAGE_KEYS } from "@/shared/config";
import { storage } from "@/shared/lib";

/* Who is signed in and with which role. Persisted to localStorage so a
   refresh keeps the session. */
const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [signedIn, setSignedIn] = useState(() => storage.get(STORAGE_KEYS.auth) === "true");
  const [role, setRole] = useState(() => storage.get(STORAGE_KEYS.role) || "Admin");

  const signIn = (r) => {
    storage.set(STORAGE_KEYS.auth, "true");
    storage.set(STORAGE_KEYS.role, r);
    setRole(r);
    setSignedIn(true);
  };

  const signOut = () => {
    storage.remove(STORAGE_KEYS.auth);
    storage.remove(STORAGE_KEYS.role);
    setSignedIn(false);
  };

  const switchRole = (r) => {
    storage.set(STORAGE_KEYS.role, r);
    setRole(r);
  };

  return (
    <SessionContext.Provider value={{ signedIn, role, signIn, signOut, switchRole }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside <SessionProvider>");
  return value;
}
