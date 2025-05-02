// Fetches new jwt for CarbonAPI and refreshes auth header

export async function getCarbonHeader() {
  try {
    const res = await fetch(process.env.AUTH_URL);
    if (!res.ok) {
      throw new Error(`NetworkError-tokenrefresh: ${res.status}`);
    }
    const tok = await res.text();
    console.log("tokenRefreshed");

    const header = { headers: { Authorization: `Bearer ${tok}` } };

    return header;
  } catch (e) {
    console.log(e);
  }
}
