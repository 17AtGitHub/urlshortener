const URL = require("../models/url");
const shortUniqueId = require("short-unique-id");
const uid = new shortUniqueId({ length: 7 });

const handleGenerateNewShortURL = async (req, res) =>{
  try {
    const body = req.body;
    console.log("req body: ", req.body);
    if(!body.url){
      return res.status(400).json({err: "URL IS REQUIRED"});
    }
    const newID = uid.rnd();
    console.log("url, newID: ", body.url, newID);
    const shortURL = new URL({
      shortId: newID,
      redirectURL: body.url,
      visitHistory: [],
    });
    console.log("Object for the new shortURL created");
    await shortURL.save();
    console.log("Saved the new short URL in the DB");
    console.log("--------------------------------");
    return res.render("pages/index", {
      new_id: newID,
    })
    // return res.status(201).json({ id: newID });
  } catch (error) {
    console.log("Error in Generate URL handler");
    throw error;
  }
}

const handleGetURLAtShortId = async (req, res) => {
  // extract the shortid from dynamic params
  const shortid = req.params.shortId;
  console.log(`Extracted param is ${shortid}`);
  // find the document from the collection
  console.log("Async find and update operation on the DB");
  const document = await URL.findOneAndUpdate(
    {
      shortId: shortid // key to find on
    }, 
    {
      // update: push in the visithistory attribute: current time.
      $push: {
        visitHistory: {
          timestamp: Date.now()
        },
      }
    }
  );
    
  // console.log("VisitHistory Updated New Length: ", document.visitHistory.length);
  console.log(`Redirecting to url: ${document.redirectURL}`);
  console.log("--------------------------------");
  res.redirect(document.redirectURL);
}

const handleGetAnalyticsShortURL = async (req, res) => {
  try {
    const shortid = req.params.shortId;
    console.log("Shortid from params: ", shortid);
    const document = await URL.findOne({shortId: shortid});
    if(document){
      console.log("Fetched document from database.");
      const stats = {
        Clicks: document.visitHistory.length,
        Timestamps: document.visitHistory.map(visit => visit.timestamp),
      }
      console.log("--------------------------------");
      return res.status(200).json(stats);
    }
    return res.status(400).json({message: "Enter a valid Short ID"});
  } catch (error) {
    console.log("Error in Get Analytics for ShortURL");
    throw error;
  }
}

const handleDeleteShortURL = async (req, res) => {
  try {
    const shortid = req.params.shortId;
    await URL.findOneAndDelete({shortId: shortid});
    console.log("Deleted URL with shortid: ", shortid);
    return res.status(200).json({message: "Delete URL successful"});
  } catch (error) {
    console.log("Error in Deleting Short URL");
    throw error;
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetURLAtShortId,
  handleGetAnalyticsShortURL,
  handleDeleteShortURL,
}
