const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

// In-memory storage for receipts
const receipts = new Map();


// Post endpoint that takes in a JSON receipt and returns a JSON object with an ID generated
app.post("/receipts/process", (req, res) => {
  const receipt = req.body;

  if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total)
  {
    return res.status(400).json({ 
      error: "Invalid receipt" 
    });
  }

  // Generate a unique ID for the receipt
  const id = uuidv4();

  // Function that calculate points for the receipt
  const points = calculatePoints(receipt);

  // Store the receipt in memory
  receipts.set(id, points);

  res.status(200).json({ id });
});




// Function to calculate points
function calculatePoints(receipt) {
    let points = 0;
  
    // For "One point for every alphanumeric character in the retailer name."
    const alphanumeric = receipt.retailer.replace(/[^a-zA-Z0-9]/g, "");
    points += alphanumeric.length;


    // For "50 points if the total is a round dollar amount with no cents."
    const total = parseFloat(receipt.total);
    if (total === Math.floor(total)) {
      points += 50;
    }
    
    // For "25 points if the total is a multiple of 0.25"
    if (total % 0.25 === 0) {
      points += 25;
    }
    
    // For "5 points for every two items on the receipt."
    points += Math.floor(receipt.items.length / 2) * 5;
  
    // For "If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned"
    receipt.items.forEach((item) => {
      const trimmedLength = item.shortDescription.trim().length;
      if (trimmedLength % 3 === 0) {
        const price = parseFloat(item.price);
        points += Math.ceil(price * 0.2);
      }
    });


    // For "6 points if the day in the purchase date is odd."
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getDate() % 2 !== 0) {
      points += 6;
    }
  
    // For "10 points if the time of purchase is after 2:00pm and before 4:00pm."
    const purchaseTime = receipt.purchaseTime.split(":");
    const hour = parseInt(purchaseTime[0]);
    if (hour >= 14 && hour < 16) {
      points += 10;
    }
  
    return points;
  }

  

// Endpoint: Get Points
app.get("/receipts/:id/points", (req, res) => {
  const id = req.params.id;

  // Check if the receipt exists
  if (!receipts.has(id)) {
    return res.status(404).json({
      error: "No receipt found for that ID"
    });
  }

  const points = receipts.get(id);
  res.status(200).json({ points });
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});