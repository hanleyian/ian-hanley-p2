import express from 'express';
import connectDatabase from './config/db';
import config from 'config';
import cors from 'cors';
import Player from './api/gameScores';
import { check, validationResult } from 'express-validator';



//initiate express application
const app = express();

//connect database
connectDatabase();

app.use(express.json({ extended: false }));
app.use(
  cors({
    origin: '*'
  })
);

/**
 * @route GET /
 * @desc Test endpoint
 */

app.get('/api/', (req, res) => res.send('http get request sent to api'));

//connection listener
//app.listen(3000, () => console.log('Express server running on port 3000'));


app.post(
    '/api/gameScores',
    [
        check('name', 'Please enter your name')
        .not()
        .isEmpty(),

        check('score', 'Please enter score')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
    //res.send('inside gamescores');
      // player = new Player({
      //   name: name,
      //   score: score
      // })
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()});
      } else {
        const { name, score } = req.body;
      
      try {
        
              const player = new Player({
                name: name,
                score: score
              });

                await player.save();

                res.send('data accept');

      }
      catch (error) {
        res.status(500).send('Server error');
        console.log('error saving score' + error)
      }
    }
    }      
  );


  
  
  // Connection listener
  const port = 5000;
  app.listen(port, () => console.log(`Express server running on port ${port}`));