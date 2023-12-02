const client = require('./client');
const util = require('util');

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query('SELECT * FROM videoGames');
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    try {
        const { title, platform, rating } = body;
        const { rows: [newVideoGame] } = await client.query(`
            INSERT INTO videoGames(title, platform, rating)
            VALUES($1, $2, $3)
            RETURNING *;
        `, [title, platform, rating]);

        return newVideoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    try {
        const { title, platform, rating } = fields;
        const { rows: [updatedVideoGame] } = await client.query(`
            UPDATE videoGames
            SET title = COALESCE($1, title),
                platform = COALESCE($2, platform),
                rating = COALESCE($3, rating)
            WHERE id = $4
            RETURNING *;
        `, [title, platform, rating, id]);

        return updatedVideoGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    try {
        const { rows: [deletedVideoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return deletedVideoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}