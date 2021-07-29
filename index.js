import express from 'express';
import bindRoutes from './routes.js';

const app = express()

// Bind Express middleware to parse JSON request bodies
app.use(express.json());

// Bind route definitions to Express app
bindRoutes(app);

const PORT = 3000
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})

