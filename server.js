const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const routes = require('./routes/serverRoutes');
const app = express();

const { createDefaultAdmin } = require('./models/user');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml'); 



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  mongoose.connect('mongodb://127.0.0.1:27017/EMBS_Backend', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>{ console.log('MongoDB connected'); 
    createDefaultAdmin().then(() => console.log('Default admin creation process completed.'));
    })
  .catch(err => console.log(err));



// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS) for all domains
app.use(routes);



// Global Error Handling for uncaught errors
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  process.exit(1); // Exit the process
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
