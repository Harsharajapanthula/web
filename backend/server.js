const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Table = require('./models/ordermodel.js');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://222devika:Y5xPbaajPAv7xGH7@cluster0.zslwbiq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Fetch tables based on capacity and status
app.get('/tables', async (req, res) => {
    const capacity = req.query.capacity; // Capacity entered by the user
    try {
        // Find tables with capacity equal to the entered capacity and status is "no"
        const tables = await Table.find({ capacity: capacity, state: "no" });
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// app.get('/useful', async (req, res) => {
//   try {
//       const tables = await Table.find({ state: "yes" });
//       res.json(tables);
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });
app.get('/useful', async (req, res) => {
    try {
      const tables = await Table.find({ state: "yes" });
      if (tables.length === 0) {
        res.json({ message: "uf" });
      } else {
        res.json(tables);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Update table state to "yes" when submitting an order
app.post('/submitorders', async (req, res) => {
  const { tableNumber, orders ,name,phone} = req.body;

  try {
      // Find the table by its number
      const table = await Table.findOne({ number: tableNumber });

      if (table) {
          // Update the orders and state fields in the table document
          table.orders = orders;
          table.state = "yes";
          table.name=name;
          table.phone=phone;

          // Save the updated table document
          await table.save();
          res.status(200).json({ message: 'Orders saved successfully.' });
      } else {
          res.status(404).json({ error: 'Table not found.' });
      }
  } catch (error) {
      console.error('Error saving orders:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});
app.put('/remove/:tableNumber', async (req, res) => {
  const tableNumber = req.params.tableNumber;

  try {
      // Find the table by its number
      const table = await Table.findOne({ number: tableNumber });

      if (table) {
          // Update the state to "no" and clear orders
          table.state = "no";
          table.orders = [];
          table.name=" ";
          table.phone=" ";

          // Save the updated table document
          await table.save();
          res.status(200).json({ message: 'Table updated successfully.' });
      } else {
          res.status(404).json({ error: 'Table not found.' });
      }
  } catch (error) {
      console.error('Error updating table:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const Table = require('./models/ordermodel.js');
// const app = express();
// const PORT = 5000;
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://222devika:Y5xPbaajPAv7xGH7@cluster0.zslwbiq.mongodb.net/your_database_name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Fetch tables based on capacity and status

// app.get('/tables', async (req, res) => {
//   const capacity = parseInt(req.query.capacity); // Parse capacity as an integer
//   try {
//       // Find tables with capacity equal to the entered capacity and state is "no"
//       const tables = await Table.find({ capacity: capacity, state: "no" });
//       res.json(tables);
//   } catch (err) {
//       res.status(500).json({ message: err.message });
//   }
// });

// // Update table state to "yes" when submitting an order
// app.post('/submit-order', async (req, res) => {
//   const { tableNumber, orders } = req.body;

//   try {
//       // Find the table by its number
//       const table = await Table.findOne({ number: tableNumber });

//       if (table) {
//           // Update the orders and state fields in the table document
//           table.orders = orders;
//           table.state = "yes";

//           // Save the updated table document
//           await table.save();
//           res.status(200).json({ message: 'Orders saved successfully.' });
//       } else {
//           res.status(404).json({ error: 'Table not found.' });
//       }
//   } catch (error) {
//       console.error('Error saving orders:', error);
//       res.status(500).json({ error: 'Internal server error.' });
//   }
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
