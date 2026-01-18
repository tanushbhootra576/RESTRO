// Utility to get N random menu items from a provided list
export function getRandomTopPicks(menuItems = [], count = 8) {
    const items = Array.isArray(menuItems) ? menuItems : [];
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
