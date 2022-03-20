const API_URL = "https://solar-backend.reiningapps.de";

export async function fetchProduction() {
  const response = await fetch(`${API_URL}/api/production`);
  return response.json();
}

export async function fetchInverters() {
  const response = await fetch(`${API_URL}/api/measurements/latest`);
  return response.json();
}

export async function fetchProductionMeasurements() {
  const response = await fetch(`${API_URL}/api/measurements`);
  return response.json();
}
