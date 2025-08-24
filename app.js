const express = require("express");
const mongoose = require("mongoose");
const engine = require("ejs-mate");
const Listing = require("./models/listing.js");
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.use(express.urlencoded({ extended: true }));
// initilize database
main().then(() => {
  console.log("Connection is build..");
}).catch (err=> {
  throw err;
})
async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

app.listen(8080, () => {
  console.log("Server is running ..");
})

// all listing show
app.get("/listing",async (req, res) => {
  const lists = await Listing.find({});
  res.render("home.ejs", { data: lists });
})

// view individual list
app.get("/listing/view/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const list1 = await Listing.findById(id);
    if (!list1) {
      return res.status(404).send("Listing not found");
    }
    res.render("view", { data: list1 });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// add new list
app.get("/listing/new", (req, res) => {
  res.render("add.ejs");
});

app.post("/listing", async (req, res) => {
  try {
    const user1 = new Listing({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      price: Number(req.body.price),
      location: req.body.location,
      country: req.body.country
    });

    await user1.save();

    res.send(`
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f8f8f8;
        }
        .notification-card {
          background: #fff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
          text-align: center;
          position: relative;
          width: 320px;
          animation: fadeIn 0.4s ease-in-out;
        }
        .notification-card h2 {
          color: #2ecc71;
          margin: 0 0 10px;
        }
        .notification-card p {
          color: #555;
          font-size: 14px;
          margin: 0;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .close-btn:hover {
          color: #e74c3c;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }
      </style>
    </head>
    <body>
      <div class="notification-card">
        <button class="close-btn" onclick="redirectNow()">✖</button>
        <h2>✅ Success!</h2>
        <p>New product added successfully.</p>
      </div>

      <script>
        function redirectNow() {
          window.location.href = '/listing';
        }
        // Auto redirect after 2.5 seconds
        setTimeout(redirectNow, 50000);
      </script>
    </body>
  </html>
`);

  } catch (err) {
    console.log(err);
    res.status(500).send("❌ Error saving listing");
  }
});
// edit lists by get 
app.get("/listing/edit/:id", async(req, res) => {
  const { id } = req.params;
  const list = await Listing.findById(id);
  res.render("edit", { data: list });
});

app.post("/listing/edit/:id", async (req, res) => {
  const { id } = req.params;
  await Listing.updateOne({ _id: id }, req.body).then((result) => {
    res.send(`
  <html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        .card {
          background: #fff;
          padding: 20px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          text-align: center;
          position: relative;
          width: 350px;
        }
        .card h2 {
          color: #2ecc71;
          margin: 0;
          font-size: 20px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 18px;
          cursor: pointer;
          color: #888;
        }
        .close-btn:hover {
          color: #000;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="close-btn" onclick="redirectNow()">❌</span>
        <h2>✅ Product Updated Successfully!</h2>
        <p>You will be redirected shortly...</p>
      </div>

      <script>
        function redirectNow(){
          window.location='/listing';
        }
        setTimeout(redirectNow, 5000);
      </script>
    </body>
  </html>
`);

    console.log(result);
  }).catch(err => {
    console.log("error occure");
  });
});

// Deleting the list
app.post("/listing/delete/:id", async(req, res) => {
  try {
    const { id } = req.params;
    await Listing.deleteOne({ _id: id }).then((result) => {
      console.log(result);
      res.redirect("/listing");
    })
  } catch (err) {
    console.log(err);
  }
  
})
// search the lists by country
app.post("/listing/search", async (req, res) => {
  try {
    const { country } = req.body;
    const list = await Listing.find({ country: { $regex: country, $options: "i" } }); // case-insensitive search
    res.render("search", { data: list, searchCountry: country });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});
