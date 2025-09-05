const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
require("dotenv").config();
const Listing = require('./models/listing.js');
const ExpressError = require('./ExpressError');
const { upresponse, insertresponse, defaultresponse } = require('./modulo');
const app = express();
app.set('view engine', 'ejs');
app.engine('ejs', engine);
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
// initilize database
main()
  .then(() => {
    console.log('http://localhost:8080/listing');
  })
  .catch((err) => {
    throw err;
  });
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

app.listen(PORT, () => {
  console.log('Server is running ..');
});

// middle ware for listing
// Async Wrap
function Asysnwrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) =>
      next(new ExpressError(402, 'Something Went Wrong'))
    );
  };
}
// all listing show
app.get('/listing', async (req, res, next) => {
  try {
    const lists = await Listing.find({});
    res.render('home.ejs', { data: lists });
  } catch (err) {
    next(new ExpressError(403, 'Data not found'));
  }
});

// view individual list
app.get(
  '/listing/view/:id',
  Asysnwrap(async (req, res, next) => {
    let { id } = req.params;
    const list1 = await Listing.findById(id);
    res.render('view', { data: list1 });
  })
);

// add new list
app.get('/listing/new', (req, res) => {
  res.render('add.ejs');
});

app.post(
  '/listing',
  Asysnwrap(async (req, res, next) => {
    const user1 = new Listing({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
      location: req.body.location,
      country: req.body.country,
    });
    await user1.save();

    res.send(insertresponse);
  })
);
// edit lists by get
app.get(
  '/listing/edit/:id',
  Asysnwrap(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ExpressError(400, 'Invalid ID format');
    }

    const list = await Listing.findById(id);
    if (!list) {
      next(new ExpressError(err));
    }
    res.render('edit', { data: list });
  })
);

app.post(
  '/listing/edit/:id',
  Asysnwrap(async (req, res) => {
    const { id } = req.params;
    await Listing.updateOne({ _id: id }, req.body).then((result) => {
      res.send(upresponse);

      console.log(result);
    });
  })
);

// Deleting the list
app.post(
  '/listing/delete/:id',
  Asysnwrap(async (req, res) => {
    const { id } = req.params;
    await Listing.deleteOne({ _id: id }).then((result) => {
      console.log(result);
      res.redirect('/listing');
    });
  })
);
// search the lists by country
app.post(
  '/listing/search',
  Asysnwrap(async (req, res) => {
    const { country } = req.body;
    const list = await Listing.find({
      country: { $regex: country, $options: 'i' },
    }); // case-insensitive search
    res.render('search', { data: list, searchCountry: country });
  })
);
// page not found handler
app.use((req, res) => {
  res.send(defaultresponse);
});
// Error Handler
app.use((err, req, res, next) => {
  let { status = 401, message = 'page not found' } = err;
  res.status(status).send(message);
  next(err);
});
