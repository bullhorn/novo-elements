export async function sleep(milliseconds: number = 500): Promise<void> {
    await browser.pause(milliseconds);
}
