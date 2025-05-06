// fetches carbon print queue data. takes in the url and http header as arguments.

export async function getCarbonPrints(url, header) {
  const retries = 3;
  let attempt = 0;
  let delay = 2000;

  while (attempt < retries) {
    try {
      const apiRes = await fetch(url, header);

      if (!apiRes.ok) {
        throw new Error(`CarbonAPI-NetworkError: ${apiRes.status}`);
      }

      const carbonJson = await apiRes.json();
      return carbonJson;
    } catch (e) {
      attempt++;
      if (attempt === retries) throw new Error("CarbonAPI-MaxRetriesReached.");

      console.error(
        `Attempt ${attempt} failed. Retrying in ${delay / 1000} seconds.`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      delay *= 2;

      console.log(e);
    }
  }
}
