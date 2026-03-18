const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

export function formatISO(start, end) {
    if (!start) return '';
    const startISO = new Date(start).toISOString();
    if (!end) return startISO;
    const endISO = new Date(end).toISOString();
    return `${startISO}/${endISO}`;
}
export function formatISONextDay(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString();
}
export function formatDateHash(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const dayNum = date.getDate();
    const monthNum = date.getMonth() + 1;

    return `${dayNum}-${monthNum}`;
}
export function formatDateNumber(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
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
export function formatDayName(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const dayName = days[date.getDay()];
    return `${dayName}`;
}
export function formatDayNumber(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const dayNum = date.getDate();
    return `${dayNum}`;
}




function formatTimeItalian(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return minutes === 0 ? `${hours}` : `${hours}:${minutes.toString().padStart(2, '0')}`;
}