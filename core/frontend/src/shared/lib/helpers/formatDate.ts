export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const diffYears = now.getFullYear() - date.getFullYear();
    const isSameYear = diffYears === 0;
    const isSameMonth = isSameYear && date.getMonth() === now.getMonth();
    const isSameDay = isSameMonth && date.getDate() === now.getDate();

    const timeDiff = now.getTime() - date.getTime();
    const is5minutesAgo = timeDiff <= 5 * 60 * 1000; // 5 minutes in milliseconds

    if (isSameDay && is5minutesAgo) {
        return "just now";
    }
    if (isSameDay) {
        // Today
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amOrPm = hours < 12 ? "am" : "pm";
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
    } else if (now.getTime() - date.getTime() < 86400000) {
        // Yesterday
        return "Yesterday";
    } else if (isSameMonth && now.getDate() - date.getDate() < 7) {
        // This week
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getDay()];
        return dayOfWeek;
    } else if (isSameYear || isSameMonth) {
        // Same year
        const formattedDate = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });
        return formattedDate
    } else {
        // Different year
        const formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });
        const parts = formattedDate.split("/");
        return `${parts[1]}.${parts[0]}.${parts[2]}`;
    }
}
