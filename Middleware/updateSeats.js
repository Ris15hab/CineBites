const Show = require('../Models/shows');

const updateSeats = async (seatsBooked, show_id) => {
    const show = await Show.findOne({ _id: show_id });
    if (show.seatsAvailable < seatsBooked) {
        return false
    } else {
        show.seatsAvailable = show.seatsAvailable - seatsBooked;
        show.seatsBooked = show.seatsBooked + seatsBooked;
        await show.save();
        return true
    }
}

const updateSeatsIncrease = async (seatsBooked, show_id) => {
    const show = await Show.findOne({ _id: show_id });
    show.seatsAvailable = show.seatsAvailable + seatsBooked;
    show.seatsBooked = show.seatsBooked - seatsBooked;
    await show.save();
}

module.exports = { updateSeats, updateSeatsIncrease }