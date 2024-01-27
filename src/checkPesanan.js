import fetch from "node-fetch";

export const getInfoDashbord = (sessionId, cookie) => new Promise((resolve, reject) => {
    fetch(`https://creator.shopee.co.id/supply/api/lm/sellercenter/realtime/dashboard/productList?sessionId=${sessionId}&productName=&productListTimeRange=0&productListOrderBy=productClicks&sort=desc&page=1&pageSize=100`, {
        method: `get`,
        headers: {
            authority: "creator.shopee.co.id",
            accept: "application/json",
            "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            cookie: cookie,
            language: "en",
            "sec-ch-ua":
                '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "x-env": "live",
            "x-region": "id",
            "x-region-domain": "co.id",
            "x-region-timezone": "+0700",
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(error => reject(error))
});