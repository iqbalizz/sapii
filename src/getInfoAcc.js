import fetch from "node-fetch";


export function infoAccount(cookie) {
    const index = fetch('https://shopee.co.id/api/v4/account/basic/get_account_info', {
        headers: {
            'Host': 'shopee.co.id',
            'Sec-Ch-Ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
            'Sec-Ch-Ua-Mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'X-Api-Source': 'pc',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Shopee-Language': 'id',
            'X-Requested-With': 'XMLHttpRequest',
            'Sec-Ch-Ua-Platform': '"macOS"',
            'Sec-Gpc': '1',
            'Accept-Language': 'id-ID,id;q=0.6',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
            'Referer': 'https://shopee.co.id/?is_from_login=true&is_from_login=true',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': cookie
        }
    })

        .then(async res => {
            const data = await res.json()
            return data;
        })
    return index
}