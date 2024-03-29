import fetch from "node-fetch";

export async function sendMessageToTelegram(name, totalSold, totalPenjualan) {
    const botToken = '';
    const chatId = '-';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const formattedMessage = `<pre>
- Nama Akun Shopee   : ${name}
- Total Sold Kamu    : ${totalSold}
- Total Revenue Kamu : ${totalPenjualan}
</pre>
`;

    const payload = {
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: 'HTML',
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        // console.log(data);
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
    }
}