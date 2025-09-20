require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/Supplier');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI).then(async()=>{
  await Supplier.deleteMany({});
  await Product.deleteMany({});
  const s1 = await Supplier.create({name:'ABC Co', address:'Hanoi', phone:'012345'});
  const s2 = await Supplier.create({name:'XYZ Ltd', address:'HCM', phone:'098765'});
  await Product.create({name:'Rice', price:10, quantity:100, supplier: s1._id});
  await Product.create({name:'Sugar', price:5, quantity:50, supplier: s2._id});
  console.log('Seed data done'); process.exit();
});
