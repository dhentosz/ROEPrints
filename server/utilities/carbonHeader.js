// Fetches new jwt for CarbonAPI and refreshes auth header

export async function getCarbonHeader() {
  const retries = 3;
  let attempt = 0;
  let delay = 2000;

  while (attempt < retries) {
    try {
      const res = await fetch(process.env.AUTH_URL);
      if (!res.ok) {
        throw new Error(`TokenRefresh-NetworkError: ${res.status}`);
      }
      const tok = await res.text();
      console.log("tokenRefreshed");

      const header = { headers: { Authorization: `Bearer ${tok}` } };

      return header;
    } catch (e) {
      attempt++;
      if (attempt === retries)
        throw new Error("TokenRefresh-MaxRetriesReached");

      console.error(
        `Attempt ${attempt} failed. Retrying in ${delay / 1000} seconds.`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));

      delay *= 2;

      console.log(e);
    }
  }
}
