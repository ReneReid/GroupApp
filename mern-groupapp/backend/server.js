
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const booksRouter = require('./routes/books');
const facilitatorsRouter = require('./routes/facilitators');
const groupsRouter = require('./routes/groups');
const lessonsRouter = require('./routes/lessons');
const neighborhoodsRouter = require('./routes/neighborhoods'); 
const otherStakeholdersRouter = require('./routes/otherStakeholders');
const participantsRouter = require('./routes/participants'); 
const serviceProjectsRouter = require('./routes/serviceProjects');  


app.use('/books', booksRouter);
app.use('/facilitators', facilitatorsRouter);
app.use('/groups', groupsRouter); 
app.use('/lessons', lessonsRouter); 
app.use('/neighborhoods', neighborhoodsRouter); 
app.use('/otherStakeholders', otherStakeholdersRouter); 
app.use('/participants', participantsRouter);
app.use('/serviceProjects', serviceProjectsRouter);




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});