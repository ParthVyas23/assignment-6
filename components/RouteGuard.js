/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  isAuthenticatedAtom,
  favouritesAtom,
  searchHistoryAtom,
  authToken,
} from "@/store";
import { getFavourites, getHistory } from "../lib/userData";
import { getToken, readToken } from "@/lib/authenticate";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);
  const [, setAuthToken] = useAtom(authToken);

  const PUBLIC_PATHS = ["/login", "/register"];

  let token = readToken();

  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) {
      const token = readToken();
      setAuthToken(token);
      updateAtoms();
    }
  }, [isAuthenticated]);

  async function updateAtoms() {
    try {
      setFavouritesList(await getFavourites());
      setSearchHistory(await getHistory());
    } catch (error) {
      setFavouritesList([]);
      setSearchHistory([]);
    }
  }

  useEffect(() => {
    const path = router.pathname;
    if (!isAuthenticated && !PUBLIC_PATHS.includes(path)) {
      router.push("/login");
    }
  }, [router.pathname, isAuthenticated]);

  return <>{children}</>;
}
