const express = require('express');
const router = express.Router();

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
router.post('/', async (req, res, next) => {
    try {
        // Get data from the request body
        const gameData = req.body;

        // Validate the data (e.g., check if required fields are present)

        // Create a new video game
        const newVideoGame = await createVideoGame(gameData);

        // Send the created video game as the response
        res.status(201).send(newVideoGame);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/video-games/:id - update a single video game by id
router.put('/:id', async (req, res, next) => {
    try {
        // Get the video game ID from the request parameters
        const gameId = req.params.id;

        // Get updated data from the request body
        const updatedData = req.body;

        // Update the video game with the provided ID
        const updatedVideoGame = await updateVideoGame(gameId, updatedData);

        // Send the updated video game as the response
        res.send(updatedVideoGame);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
router.delete('/:id', async (req, res, next) => {
    try {
        // Get the video game ID from the request parameters
        const gameId = req.params.id;

        // Delete the video game with the provided ID
        const deletedVideoGame = await deleteVideoGame(gameId);

        // Send the deleted video game as the response
        res.send(deletedVideoGame);
    } catch (error) {
        next(error);
    }
});

module.exports = router;