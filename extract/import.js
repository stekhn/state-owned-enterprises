var fs = require('fs');
var path = require('path');
var parse = require('csv-parse/lib/sync');

var mongoClient = require('mongodb').MongoClient;

var mongoUrl = 'mongodb://localhost:27017/stateo';
var collectionName = 'companies';

(function init() {

   // Load and parse the datasets
  var companies = parseCSV(loadFile('./extract/direct_ownership.csv'));

  saveToMongo(companies);
})();

function saveToMongo(companies) {

  mongoClient.connect(mongoUrl, function (error, db) {

    if (!error) {

      console.log('Connected to database', mongoUrl);
      var collection = db.collection(collectionName);
      var batch = collection.initializeOrderedBulkOp();

      companies.forEach(function (company) {

        // Convert ID to string
        company.id = company.id.toString();

        // Convert date strings to date objects
        company.source_date = new Date(company.source_date);

        if(company.parents) {

          company.parents = company.parents.toString();
          company.parents = company.parents.split(',');
        } else {

          company.parents = [];
        }

        if(company.children) {

          company.children = company.children.toString();
          company.children = company.children.split(',');
        } else {

          company.children = [];
        }

        console.log('Upserted company ', company.name);

        // Upsert method
        batch.find({ id: company.id }).upsert().update({
          $set: company
        });

        // Insert method
        // batch.insert(tweet);
      });

      batch.execute(function (error, result) {

        if (!error) {

          console.log('Number of entries matched:', result.nMatched);
          console.log('Number of entries inserted:', result.nInserted);
          console.log('Number of entries upserted:', result.nUpserted);
          console.log('Number of entries modified:', result.nModified);
          db.close();
        } else {

          console.log(error);
          db.close();
        }
      });
    } else {

      console.log(error);
      db.close();
    }
  });
}

function parseCSV(data, callback) {

  var options = {

    delimiter: ';',
    columns: true,
    auto_parse: true
  };

  return parse(data, options, function (error, parsedData) {

    if (!error) {

      return parsedData;
    } else {

      console.log(error);
    }
  });
}

function loadFile(relativePath) {

  relativePath = path.normalize(relativePath);

  try {

    return fs.readFileSync(relativePath, 'utf8').toString();
  } catch (error) {

    console.log(error);
  }
}
