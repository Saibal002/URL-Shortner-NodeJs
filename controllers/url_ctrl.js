const express=require('express');
const URL=require('../models/url');
//const routes=require('../routes/url_route');

const shortid = require('shortid');

async function handleGenerateNewURL(req,res)
{
  const body= req.body; 
  if(!body.url)
    return res.status(400).json({error:'url is required'})
  
    const shortID=shortid();
  
    await URL.create({
    shortId:shortID,
    redirectURL:body.url,
    visitHistory: [],
  });
  return res.render('homepage',{id:shortID});
  // return res.json({id:shortID});
}
async function handleGetAnalytics(req,res) {
  const shortId=req.params.shortId;
  await URL.findOne({shortId});
  return res.json({totalClicks: result.visitHistory.length,analytics:result.visitHistory,})
  
}

module.exports={
    handleGenerateNewURL,
    handleGetAnalytics,
    
}