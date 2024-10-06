const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/update-score', async (req, res) => {
  const { username, level, correctTilesSelected, totalTiles } = req.body;
  
  try {
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const existingLevelIndex = user.levels.findIndex(l => l.level === level);
    if (existingLevelIndex !== -1) {
      if (correctTilesSelected > user.levels[existingLevelIndex].correctTilesSelected) {
        user.levels[existingLevelIndex] = { level, totalTiles, correctTilesSelected };
      }
    } else {
      user.levels.push({ level, totalTiles, correctTilesSelected });
    }
    
    const totalScore = user.levels.reduce((sum, levelData) => sum + levelData.correctTilesSelected, 0);
    
    if (totalScore > user.maxScore) {
      user.maxScore = totalScore;
    }
    
    await user.save();
    
    res.status(200).json({
      message: 'Score updated successfully',
      maxScore: user.maxScore,
      currentScore: totalScore,
    });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Error updating score', error: error.message });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const topScores = await User.find({})
      .sort({ maxScore: -1 })
      .limit(10)
      .select('username maxScore');
    
    res.status(200).json(topScores);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
