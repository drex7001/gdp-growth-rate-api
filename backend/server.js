import express from 'express';
import csv from 'csv-parser';
import fs from 'fs';

const port = 8000;
const app = express();
const results = [];

app.get('/country/:country/stat-year/:sy/end-year/:ey', (req, res) => {
  let country = req.params.country;
  let start_year = req.params.sy;
  let end_year = req.params.ey;
  let country_name = null;
  let values = [];

  fs.createReadStream('gdp_country.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {});

  for (let key in results) {
    if (
      results[key]['Country Name'] == country &&
      results[key].Year == start_year
    ) {
      console.log(results[key]['Country Name'] + '==' + country);
      console.log(results[key].Year + '==' + start_year);
      console.log(results[key].Value);
      values.push(results[key].Value);
      break;
    }
  }

  for (let key in results) {
    if (
      country == results[key]['Country Name'] &&
      end_year == results[key].Year
    ) {
      console.log(results[key]['Country Name'] + '==' + country);
      console.log(results[key].Year + '==' + end_year);
      console.log(results[key].Value);
      values.push(results[key].Value);
      break;
    }
  }

  const gdprate = (values[1] - values[0]) / values[0];

  res.json(gdprate);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
