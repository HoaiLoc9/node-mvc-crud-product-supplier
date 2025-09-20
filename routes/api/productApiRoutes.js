const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req,res)=> {
  const items = await Product.find().populate('supplier');
  res.json(items);
});

router.post('/', async (req,res)=>{
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

router.get('/:id', async (req,res)=>{
  const p = await Product.findById(req.params.id).populate('supplier');
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

router.put('/:id', async (req,res)=>{
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(p);
});

router.delete('/:id', async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({message:'deleted'});
});

module.exports = router;
