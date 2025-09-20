const express = require('express');
const router = express.Router();
const Supplier = require('../../models/Supplier');

/**
 * @openapi
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     responses:
 *       200:
 *         description: List of suppliers
 */
router.get('/', async (req,res)=> {
  const items = await Supplier.find();
  res.json(items);
});

router.post('/', async (req,res)=>{
  const s = await Supplier.create(req.body);
  res.status(201).json(s);
});

router.get('/:id', async (req,res)=>{
  const s = await Supplier.findById(req.params.id);
  if(!s) return res.status(404).json({message:'Not found'});
  res.json(s);
});

router.put('/:id', async (req,res)=>{
  const s = await Supplier.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(s);
});

router.delete('/:id', async (req,res)=>{
  await Supplier.findByIdAndDelete(req.params.id);
  res.json({message:'deleted'});
});

module.exports = router;
