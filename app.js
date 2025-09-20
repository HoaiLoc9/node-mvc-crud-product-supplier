require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');
const apiSupplierRoutes = require('./routes/api/supplierApiRoutes');
const apiProductRoutes = require('./routes/api/productApiRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>console.log('Mongo connected'))
  .catch(err=>console.error('Mongo connection error', err));

// routes
app.use('/', supplierRoutes);
app.use('/products', productRoutes);
app.use('/api/suppliers', apiSupplierRoutes);
app.use('/api/products', apiProductRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));
