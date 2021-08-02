import express from 'express';
import bodyParser from 'body-parser';
import bindRoutes from './routes.js';

const app = express()

app.set('view engine', 'ejs'); // Set Express view engine to EJS 
app.use(express.json()); // Bind Express middleware to parse JSON request bodies

// Bind route definitions to Express app
bindRoutes(app);


const PORT = 3000
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

export default app;