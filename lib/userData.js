"use client";

const { getToken } = require("./authenticate");

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchWithAuth = async (urlEndpoint, options) => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found. User not authenticated.");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(urlEndpoint, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
};

export async function addToFavourites(id) {
  const url = `${API_URL}/api/user/favourites/${id}`;
  const options = { method: "PUT" };
  return fetchWithAuth(url, options);
}

export async function removeFromFavourites(id) {
  const url = `${API_URL}/api/user/favourites/${id}`;
  const options = { method: "DELETE" };
  return fetchWithAuth(url, options);
}

export async function getFavourites() {
  const url = `${API_URL}/api/user/favourites`;
  const options = { method: "GET" };
  return fetchWithAuth(url, options);
}

export async function addToHistory(id) {
  const url = `${API_URL}/api/user/history/${id}`;
  const options = { method: "PUT" };
  return fetchWithAuth(url, options);
}

export async function removeFromHistory(id) {
  const url = `${API_URL}/api/user/history/${id}`;
  const options = { method: "DELETE" };
  return fetchWithAuth(url, options);
}

export async function getHistory() {
  const url = `${API_URL}/api/user/history`;
  const options = { method: "GET" };
  return fetchWithAuth(url, options);
}
