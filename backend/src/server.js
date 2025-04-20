const express = require("express");
const routes = require("./routes");
const middleware = require("./middleware");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(middleware.requestLogger);

// Routes
app.use("/api", routes);

// Error handling
app.use(middleware.errorHandler);

// Start the server only if this file is executed directly (not imported elsewhere)
// This prevents potential port conflicts during testing or when the file is used as a module
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;



// // const dotENV = require('dotenv').config();
// const cors = require('cors');
// const express = require('express');
// const { cloudinary } = require('./config/cloudinary');
// const authRouter = require('./routers/authorization');
// const userRouter = require('./routers/users');
// const tagsRouter = require('./routers/tags');
// const bookingsRouter = require('./routers/bookings');
// const app = express();
// const PORT = process.env.PORT || 4000;

// // MiddleWares
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());

// app.get('/', (req, res, next) => {
//   res.json('Hello World');
// });

// // Routers
// app.use('/', authRouter);
// app.use('/users', userRouter);
// app.use('/tags', tagsRouter);
// app.use('/bookings', bookingsRouter);

// app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
