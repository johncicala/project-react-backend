const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); 
app.use(express.static("public"));


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

app.listen(3000, () => {
    console.log("im listening");
});