import mongoose from 'mongoose';

const postScore = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    score: {

        type: String,
        required: true

    }


});

const Player = mongoose.model('player', postScore);
export default Player;