const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        console.log('Creating blog with data:', req.body);
        
        const { title, content, summary, category } = req.body;
        
        // Validation
        if (!title || !content || !summary || !category) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const blog = new Blog({
            title,
            content,
            summary,
            category,
            author: req.user._id
        });

        const savedBlog = await blog.save();
        console.log('Blog saved successfully:', savedBlog);

        return res.status(201).json({
            success: true,
            data: savedBlog
        });

    } catch (error) {
        console.error('Blog creation error:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;