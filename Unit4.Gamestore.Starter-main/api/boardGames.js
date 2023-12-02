
const express = require('express');
const router = express.Router();

const {
  getAllBoardGames,
  getBoardGameById,
  createBoardGame,
  updateBoardGame,
  deleteBoardGame
} = require('../db/boardGames');

// GET - /api/board-games - get all board games
router.get('/', async (req, res, next) => {
  try {
    // Call getAllBoardGames function from the database
    const boardGames = await getAllBoardGames();

    // Send the list of board games as the response
    res.send(boardGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/board-games/:id - get a single board game by id
router.get('/:id', async (req, res, next) => {
  try {
    // Call getBoardGameById function with the provided ID from the database
    const boardGame = await getBoardGameById(req.params.id);

    // If the board game is not found, send a 404 response
    if (!boardGame) {
      res.status(404).send('Board game not found');
      return;
    }

    // Send the board game details as the response
    res.send(boardGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/board-games - create a new board game
router.post('/', async (req, res, next) => {
  try {
    // Extract board game data from the request body
    const boardGameData = req.body;

    // Call createBoardGame function with the extracted data from the database
    const newBoardGame = await createBoardGame(boardGameData);

    // Send the newly created board game as the response
    res.status(201).send(newBoardGame);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/board-games/:id - update a single board game by id
router.put('/:id', async (req, res, next) => {
  try {
    // Extract board game ID and updated data from the request
    const gameId = req.params.id;
    const updatedData = req.body;

    // Call updateBoardGame function with the ID and updated data from the database
    const updatedBoardGame = await updateBoardGame(gameId, updatedData);

    // If the board game is not found, send a 404 response
    if (!updatedBoardGame) {
      res.status(404).send('Board game not found');
      return;
    }

    // Send the updated board game as the response
    res.send(updatedBoardGame);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/board-games/:id - delete a single board game by id
router.delete('/:id', async (req, res, next) => {
  try {
    // Extract board game ID from the request
    const gameId = req.params.id;

    // Call deleteBoardGame function with the ID from the database
    const deletedBoardGame = await deleteBoardGame(gameId);

    // If the board game is not found, send a 404 response
    if (!deletedBoardGame) {
      res.status(404).send('Board game not found');
      return;
    }

    // Send the deleted board game as the response
    res.send(deletedBoardGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;