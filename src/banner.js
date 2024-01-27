import chalk from "chalk";

export const bannerMain = () => {
    const valueText = `
    █▄▄ █▀█ ▀█▀   █▀ █░█ █▀█ █▀█ █▀▀ █▀▀
    █▄█ █▄█ ░█░   ▄█ █▀█ █▄█ █▀▀ ██▄ ██▄
                       ${chalk.green(`Create - balcrots`)}
    `
    return valueText
}

export const bannerFeatures = () => {
    const valueText = `${chalk.yellow(`[-] Pilih Features Dibawah Ini`)}
    [1] Auto Likes And Shares
    [2] Auto Pin Product By Request
    [3] On Total Order Notification To Telegram
    `
    return valueText;
}