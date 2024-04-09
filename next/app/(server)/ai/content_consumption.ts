const { ApifyClient } = require("apify-client");

const apifyToken: string = process.env.APIFY_TOKEN || "";
if (!apifyToken) throw new Error("Missing Apify API Token.");


const apify = new ApifyClient({
    token: apifyToken,
});


async function getContentConsumption(keyword: string): Promise<string[]> {
    try {
        // Prepare Actor input
        const input = {
        keyword: keyword,
        limit: 5,
        publishTime: "ALL_TIME",
        proxyConfiguration: {
            useApifyProxy: true,
        },
     };

    const run = await apify.actor("jQfZ1h9FrcWcliKZX").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log("Results from dataset");
    const { items } = await apify.dataset(run.defaultDatasetId).listItems();
    items.forEach((item: any) => {
    console.dir(
        item["aweme_info"]["video"]["bit_rate"][0]["play_addr"][
        "url_list"
        ][0] as string
    );
    });

    return items.map(
    (item: any) =>
        item["aweme_info"]["video"]["bit_rate"][0]["play_addr"][
        "url_list"
        ][0] as string
    );
} catch (error) {
    console.error("Error getting TikTok videos: ", error);
    throw error;
}
}
  