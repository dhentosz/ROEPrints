// fetches carbon print queue data. takes in the url and http header as arguments.

export async function getCarbonPrints(url, header) {
  try {
    const apiRes = await fetch(url, header);

    if (!apiRes.ok) {
      throw new Error(`CarbonAPI-NetworkError: ${apiRes.status}`);
    }

    const carbonJson = await apiRes.json();
    return carbonJson;
  } catch (e) {
    console.log(e);
  }
}
