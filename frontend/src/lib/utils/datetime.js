export function formatISO(start, end) {
    if (!start) return '';
    const startISO = new Date(start).toISOString();
    if (!end) return startISO;
    const endISO = new Date(end).toISOString();
    return `${startISO}/${endISO}`;
}

export function formatLabel(start, end) {
    if (!start) return '';
    const startDate = new Date(start);
    const startTime = formatTimeItalian(startDate);
    const dateOptions = { day: 'numeric', month: 'short' };
    const datePart = startDate.toLocaleString('it-IT', dateOptions);
    if (!end) {
        return `${datePart} alle ${startTime}`;
    }
    const endDate = new Date(end);
    const endTime = formatTimeItalian(endDate);
    if (startDate.toDateString() === endDate.toDateString()) {
        return `${datePart} dalle ${startTime} alle ${endTime}`;
    }
    const endDatePart = endDate.toLocaleString('it-IT', dateOptions);
    return `${datePart} alle ${startTime} – ${endDatePart} alle ${endTime}`;
}

function formatTimeItalian(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return minutes === 0 ? `${hours}` : `${hours}:${minutes.toString().padStart(2, '0')}`;
}