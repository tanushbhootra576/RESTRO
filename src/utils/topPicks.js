// Utility to get N random menu items from the menuItems.json file
import chocolates from '../menu/chocolates.json';
import desserts from '../menu/desserts.json';
import drinks from '../menu/drinks.json';
import iceCream from '../menu/ice-cream.json';

export function getRandomTopPicks(count = 8) {
    // Combine all menu items from all categories
    const allMenuItems = [
        ...chocolates,
        ...desserts,
        ...drinks,
        ...iceCream
    ];
    const shuffled = [...allMenuItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
