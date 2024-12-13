const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// CRUD Endpoints
router.post('/', async (req, res) => {
    const { firstName, lastName, email, department, position } = req.body;
    try {
        const employee = new Employee({ firstName, lastName, email, department, position });
        await employee.save();
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
