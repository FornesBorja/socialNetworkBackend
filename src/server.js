import express from "express";
import "dotenv/config";
import { dbConnection } from "./database/db.js";
import { router } from "./router.js"
import cors from 'cors'

const app = express();
app.use(cors())

const PORT = process.env.PORT || 5001;

app.use(express.json())

app.get("/healthy", (req, res) => {
	res.json({
		success: true,
		message: "Server is healthy",
	});
});


app.use('/api', router);

dbConnection()
.then(() => {
  console.log('Database Connected');
  app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
  });
})
.catch(error => {
  console.log('Error connection database: ' + error);
})