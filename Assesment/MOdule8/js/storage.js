const STORAGE_KEY = "hotelSubmissions";

export function getItem() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
        return [];
    }

    try {
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error("Invalid localStorage data:", error);
        return [];
    }
}

export function setItem(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
