const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

exports.index = async (req, res) => {
  const suppliers = await Supplier.find().sort({ createdAt: -1 });
  res.render('suppliers/index', { suppliers });
};

exports.show = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  const products = await Product.find({ supplier: req.params.id });
  res.render('suppliers/show', { supplier, products });
};

exports.newForm = (req, res) => res.render('suppliers/new');

exports.create = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.redirect('/');
  } catch (err) {
    res.render('suppliers/new', { error: err.message });
  }
};

exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/edit', { supplier });
};

exports.update = async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
};

exports.delete = async (req, res) => {
  await Product.deleteMany({ supplier: req.params.id });
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
