const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(express.static("public"));
const Joi = require("joi");
app.use(express.json()); 
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/dinnerItems", (req, res) => {
    const dinnerItems = [
        {
            "_id": 1,
            "name": "Cicala's Burger",
            "img_name": "images/hamburger.jpg",
            "description": "Our specialty, signature hamburger served with your choice of fries or chips.",
            "price": "$10.00",
            "ingredients": ["Beef", "Lettuce", "Tomato", "Onion", "Cheese"]
          },
          {
            "_id": 2,
            "name": "Vodka Pasta",
            "img_name": "images/vodkapasta.jpeg",
            "description": "Penne pasta served in a delicious vodka and tomato sauce. Served with parmesan cheese.",
            "price": "$12.00",
            "ingredients": ["Penne", "Homemade Vodka sauce", "Parmesan cheese"]
          },
          {
            "_id": 3,
            "name": "Jumbo Chicken Wings",
            "img_name": "images/wings.jpg",
            "description": "8 of our jumbo size chicken wings cooked to perfection. Your choice of BBQ or Buffalo sauce.",
            "price": "$15.00",
            "ingredients": ["Chicken wings", "BBQ sauce", "Buffalo sauce"]
          },
          {
            "_id": 4,
            "name": "Chicken Quesadilla",
            "img_name": "images/quesa.jpg",
            "description": "3 cheese quesadilla filled with seasoned chicken. Served with sour cream, salsa, and guacamole.",
            "price": "$18.00",
            "ingredients": ["Chicken", "Cheese", "Tortilla"]
          },
          {
            "_id": 5,
            "name": "Build your own pizza",
            "img_name": "images/pizza.jpeg",
            "description": "One of our famous bar pies. Thin crust with garlic seasoning. Add any toppings or cheese.",
            "price": "$19.00",
            "ingredients": ["Dough", "Cheese", "Tomato sauce", "Garlic"]
          },
          {
            "_id": 6,
            "name": "Caesar Salad",
            "img_name": "images/salad.jpg",
            "description": "Large Caesar salad with fresh lettuce and homemade dressing, topped with croutons and black pepper.",
            "price": "$15.00",
            "ingredients": ["Lettuce", "Caesar dressing", "Croutons", "Black pepper"]
          },
          {
            "_id": 7,
            "name": "British Fish and Chips",
            "img_name": "images/fishchip.jpg",
            "description": "British-style fish and chips. Beer-battered cod served with fries and tartar sauce.",
            "price": "$20.00",
            "ingredients": ["Fresh Cod", "Fries(Chips)", "Tartar sauce"]
          },
          {
            "_id": 8,
            "name": "Sides",
            "img_name": "images/fries.jpeg",
            "description": "French fries, onion rings, jalapeño poppers, or mozzarella sticks.",
            "price": "$5.00 Each",
            "ingredients": ["Fries", "Onion rings", "Jalapeño poppers", "Mozzarella sticks"]
          }
    ];
    res.send(dinnerItems);
})

app.get("/api/drinkItems", (req, res) => {
    const drinkItems = [
        {
            "_id": 1,
            "name": "Any beer",
            "img_name": "images/beer.jpg",
            "description": "Get a pint of any beer for the same price!",
            "price": "$5.00",
            "ingredients": ["Miller lite, Bud lite, Corona"]
        },
        {
            "_id": 2,
            "name": "Liquor shots",
            "img_name": "images/shot.jpg",
            "description": "Get a shot of any liquor for the same price! House liquor discounted.",
            "price": "$6.00, House: $5.00",
            "ingredients": ["House Liquor", "Vodka", "Tequila", "Whiskey"]
        },
        {
            "_id": 3,
            "name": "Bloody Mary",
            "img_name": "images/bloodymary.jpg",
            "description": "Tomatoes and tobasco. Bacon and shrimp optional.",
            "price": "$8.00",
            "ingredients": ["Tomato juice", "Tabasco", "Bacon", "Shrimp"]
        },
        {
            "_id": 4,
            "name": "Minty Mojito",
            "img_name": "images/mojito.jpg",
            "description": "Our specialty. Minty and fresh.",
            "price": "$8.50",
            "ingredients": ["Mint", "Lime", "Rum", "Soda water"]
        },
        {
            "_id": 5,
            "name": "Margarita",
            "img_name": "images/mrag2.jpg",
            "description": "Served with salt or sugar. Frozen or on the rocks.",
            "price": "$9.00",
            "ingredients": ["Tequila", "Lime", "Triple sec", "Salt/sugar"]
        },
        {
            "_id": 6,
            "name": "Mai Tai",
            "img_name": "images/tai.jpg",
            "description": "Made with house rum. Smoky and sweet.",
            "price": "$7.00",
            "ingredients": ["Rum", "Lime", "Syrup", "Orange curacao"]
        },
        {
            "_id": 7,
            "name": "Aperol Spritz",
            "img_name": "images/spritz.jpg",
            "description": "Wine based. An Italian favorite.",
            "price": "$10.00",
            "ingredients": ["Aperol", "Prosecco", "Soda water"]
        },
        {
            "_id": 8,
            "name": "Moscow Mule",
            "img_name": "images/mule.jpg",
            "description": "Vodka and ginger beer. Served in a copper mug.",
            "price": "$9.50",
            "ingredients": ["Vodka", "Ginger beer", "Lime"]
        }
    ];
    res.send(drinkItems);
})

let reviews = [
  { "_id": 1, name: "John Doe", review: "Great food and top notch service!"},
  { "_id": 2, name: "Jane Smith", review: "Fantastic atmosphere, long wait times."}
];

const reviewSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  review: Joi.string().min(5).max(500).required(),
});

app.get("/api/reviews", (req, res) => {
  res.send(reviews);
});

app.post("/api/reviews", (req, res) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      return res.status(400).send({ error: error.details[0].message });
  }

  const maxId = reviews.length > 0 ? Math.max(...reviews.map(review => review._id)) : 0;
  const newId = maxId + 1;

  const newReview = { _id: newId, name: req.body.name, review: req.body.review };
  
  reviews.push(newReview);
  res.send({ message: "Review added successfully", newReview });
});

app.put("/api/reviews/:id", (req, res) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  const reviewId = parseInt(req.params.id);
  const reviewIndex = reviews.findIndex((r) => r._id === reviewId);

  if (reviewIndex === -1) {
    return res.status(404).send({ error: "Review not found." });
  }

  reviews[reviewIndex] = { _id: reviewId, ...req.body };
  res.send({ message: "Review updated successfully", updatedReview: reviews[reviewIndex] });
});

app.delete("/api/reviews/:id", (req, res) => {
  const reviewId = parseInt(req.params.id);
  const reviewIndex = reviews.findIndex((r) => r._id === reviewId);

  if (reviewIndex === -1) {
    return res.status(404).send({ error: "Review not found." });
  }

  const deletedReview = reviews.splice(reviewIndex, 1);
  res.send({ message: "Review deleted successfully", deletedReview });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

mongoose.connect("mongodb+srv://johncic:0B6XV6Xvzf7nNFFr@cluster0.1gs5k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("Error connecting to MongoDB:", err));

const reviewSchema2 = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  review: { type: String, required: true, minlength: 5, maxlength: 500 },
  image: { type: String }, // Add image field to the schema
});

const Review = mongoose.model("Review", reviewSchema2);

app.get("/api/reviews", async (req, res) => {
  try {
      const reviews = await Review.find();
      res.send(reviews);
  } catch (error) {
      res.status(500).send({ error: "Failed to fetch reviews." });
  }
});

app.post("/api/reviews", upload.single('image'), async (req, res) => {
  const { name, review } = req.body;
  let imageUrl = null;

  if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; 
  }

  const newReview = new Review({ name, review, image: imageUrl });

  try {
      await newReview.save();
      res.send({ message: "Review added successfully", newReview });
  } catch (error) {
      res.status(500).send({ error: "Failed to add review." });
  }
});

app.put("/api/reviews/:id", async (req, res) => {
  const { name, review } = req.body;
  try {
      const updatedReview = await Review.findByIdAndUpdate(
          req.params.id,
          { name, review },
          { new: true, runValidators: true }
      );
      if (!updatedReview) return res.status(404).send({ error: "Review not found." });
      res.send({ message: "Review updated successfully", updatedReview });
  } catch (error) {
      res.status(500).send({ error: "Failed to update review." });
  }
});

app.delete("/api/reviews/:id", async (req, res) => {
  try {
      const deletedReview = await Review.findByIdAndDelete(req.params.id);
      if (!deletedReview) return res.status(404).send({ error: "Review not found." });
      res.send({ message: "Review deleted successfully", deletedReview });
  } catch (error) {
      res.status(500).send({ error: "Failed to delete review." });
  }
});

app.use('/uploads', express.static('uploads'));


app.listen(3000, () => {
    console.log("im listening");
});