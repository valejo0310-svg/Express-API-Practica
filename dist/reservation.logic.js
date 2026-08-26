"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// calcular duración 
function calculateDuration(startHour, endHour) {
    if (endHour <= startHour) {
        throw new Error('End hour must be greater than start hour');
    }
    ;
    const duration = endHour - startHour;
    return duration;
}
;
// Calcular total por cada hora
function calculateReservationPrice(reservation) {
    if (reservation.pricePerHour <= 0) {
        throw new Error('The price must be higher than 0');
    }
    ;
    const duration = calculateDuration(reservation.startHour, reservation.endHour);
    const finalPrice = duration * reservation.pricePerHour;
    return finalPrice;
}
;
// parametros de reserva
const reservationExample = {
    userID: 1,
    courtID: 2,
    startHour: 14,
    endHour: 17,
    pricePerHour: 50000
};
const totalPrice = calculateReservationPrice(reservationExample);
;
// Generar reservas dentro de un array utilizando el objeto 
const reservations = [];
reservations.push({ courtID: 1, startHour: 8, endHour: 10 });
reservations.push({ courtID: 2, startHour: 10, endHour: 12 });
reservations.push({ courtID: 1, startHour: 14, endHour: 16 });
// metodos de busqueda 
const foundReservation = reservations.find(reservation => reservation.courtID === 2);
const courtOneReservations = reservations.filter(reservation => reservation.courtID === 1);
const hasCourtTwoReservation = reservations.some(reservation => reservation.courtID === 4);
const courtIds = reservations.map(reservation => { return reservation.courtID; });
// función de busqueda de reservas
function hasReservationCourt(courtID) {
    const reservationExists = reservations.some(reservation => reservation.courtID === courtID);
    return reservationExists;
}
;
// Comprobar que no existan dos al tiempo 
function hasScheduleConflict(courtID, startHour, endHour) {
    const hasConflict = reservations.some((reservation) => {
        const courtConflict = reservation.courtID === courtID;
        const scheduleConflict = startHour < reservation.endHour && endHour > reservation.startHour;
        return courtConflict && scheduleConflict;
    });
    return hasConflict;
}
function validateReservationAvailability(courtID, startHour, endHour) {
    calculateDuration(startHour, endHour);
    const conflict = hasScheduleConflict(courtID, startHour, endHour);
    if (conflict) {
        throw new Error("Court not available on the choosen time");
    }
}
