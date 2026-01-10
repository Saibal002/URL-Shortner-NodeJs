const express=require('express');
const URL=require('../models/url');
//const routes=require('../routes/url_route');

const shortid = require('shortid');

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    // FIX: Fetch all URLs so the table doesn't disappear
    const allUrls = await URL.find({});

    return res.render('homepage', {
        id: shortID,
        urls: allUrls, // Pass this to the view!
    });
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    
    // FIX: Assign the result to a variable named 'result'
    const result = await URL.findOne({ shortId });
    
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports={
    handleGenerateNewURL,
    handleGetAnalytics,
    
}