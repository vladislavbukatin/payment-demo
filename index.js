
export default {
  async fetch(event) {
    try {
      return await getAssetFromKV(event);
    } catch (e) {
      return new Response("Page not found", { status: 404 });
    }
  },
};
