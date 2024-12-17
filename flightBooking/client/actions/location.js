import fetch from "isomorphic-unfetch";
import { API } from "../utils/config";
import queryString from "query-string";

export const getAllLocations = async () => {
  const resp = await fetch(`${API}/locations`);
  const response = await resp.json();
  return response;
};

export const searchFlight = async query => {
  const queryData = queryString.stringify(query);
  const resp = await fetch(`${API}/flight/search?${queryData}`);
  const response = await resp.json();
  return response;
};

export const searchFlightByFilter = async body => {
  const resp = await fetch(`${API}/flight/filter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const response = await resp.json();
  return response;
};