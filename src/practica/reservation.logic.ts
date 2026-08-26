export {};
// realizar reservas 
interface ReservationData{
    userID : number;
    courtID:number;
    startHour: number;
    endHour: number;
    pricePerHour : number
}

// calcular duración 
function calculateDuration(startHour: number, endHour: number): number{
    
    if (endHour <= startHour) {
        throw new Error ('End hour must be greater than start hour')
    };

    const duration = endHour - startHour;

    return duration;
};

// Calcular total por cada hora
function calculateReservationPrice (reservation : ReservationData): number {
    
    if (reservation.pricePerHour <= 0){
        throw new Error ('The price must be higher than 0')
    };

    const duration = calculateDuration(reservation.startHour, reservation.endHour);
    const finalPrice = duration * reservation.pricePerHour;
    

    return finalPrice;
};

// parametros de reserva
const reservationExample : ReservationData = {
    userID : 1,
    courtID: 2,
    startHour: 14,
    endHour: 17,
    pricePerHour : 50000
};

const totalPrice = calculateReservationPrice (reservationExample);

// Reserva Existente interfaz
interface ExistingReservation {
    courtID : number;
    startHour: number;
    endHour: number
};
// Generar reservas dentro de un array utilizando el objeto 
const reservations : ExistingReservation[] = []

reservations.push ({courtID: 1, startHour: 8, endHour:10 });
reservations.push ({courtID: 2, startHour: 10, endHour:12});
reservations.push ({courtID: 1, startHour: 14, endHour:16});

// metodos de busqueda 
const foundReservation = reservations.find( reservation => reservation.courtID === 2);

const courtOneReservations = reservations.filter( reservation => reservation.courtID === 1);

const hasCourtTwoReservation = reservations.some( reservation => reservation.courtID === 4);

const courtIds = reservations.map (reservation => {return reservation.courtID } );

// función de busqueda de reservas
function hasReservationCourt (courtID : number):boolean{
    const reservationExists = reservations.some(
        reservation => reservation.courtID === courtID
    );
    return reservationExists;
};

// Comprobar que no existan dos al tiempo 
function hasScheduleConflict (courtID: number, startHour: number, endHour: number):boolean{
    const hasConflict = reservations.some((reservation : ExistingReservation) =>{
        const courtConflict = reservation.courtID === courtID
        const scheduleConflict = startHour < reservation.endHour && endHour > reservation.startHour

        return courtConflict && scheduleConflict
    
    })

    return hasConflict
}


function validateReservationAvailability (courtID:number , startHour:number , endHour :number ):void {
    calculateDuration (startHour, endHour)
    const conflict: boolean = hasScheduleConflict(courtID, startHour, endHour);

    if (conflict) {
        throw new Error("Court not available on the choosen time");
    }

}
interface CreatedReservation {
    userID : number;
    courtID: number;
    startHour : number;
    endHour : number;
    totalPrice : number
}
const createdReservations : CreatedReservation [] = []

function createReservation (reservation : ReservationData):CreatedReservation{

    validateReservationAvailability (reservation.courtID, reservation.startHour, reservation.endHour)
 
    const totalPrice: number= calculateReservationPrice (reservation)

    const newReservation : CreatedReservation = {
        userID : reservation.userID,
        courtID : reservation.courtID,
        startHour : reservation.startHour,
        endHour : reservation.endHour,
        totalPrice : totalPrice
    }
    createdReservations.push (newReservation)
    return newReservation
}

function findCreatedReservationByUser (userID : number): CreatedReservation | undefined {
    const foundReservation = createdReservations.find(
        reservation => reservation.userID === userID
    )

    return foundReservation
}

function getCreatedReservationByUser (userID : number):CreatedReservation{
    const reservation = findCreatedReservationByUser(userID)
    if (!reservation){
        throw new Error ('We couldnt find the reservation you are searching for, make sure it exists')
    }
    return reservation
}