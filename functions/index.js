// import express, { Request, Response } from 'express';
// import cors from 'cors';
// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const functions = require("firebase-functions");


const app = express();
app.use(cors());


app.get("/routes/markets", (req, res) => {
  const ticker = req.query.ticker;
  const range = req.query.range;
  // console.log(ticker, range)
  axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?&interval=1d&range=${range}`)
      .then((response) => {
        // console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => console.error("An error occurred: " + error));
});


app.get("/routes/markets/fundamentals", (req, res) => {
  const ticker = req.query.ticker;
  const modules = req.query.modules;
  // console.log(modules)
  axios.get(`https://query1.finance.yahoo.com/v11/finance/quoteSummary/${ticker}?modules=${modules}`,
  // {params: {
  //     modules: "defaultKeyStatistics,financialData",
  //   }
  // }
  )
      .then((response) => res.json(response.data));
  // .catch(error =>
  // console.error("An error occurred with fundamentals data: " + error))
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// "dev": "next dev",
exports.app = functions.https.onRequest(app);
