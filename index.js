// require('dotenv').config();
// const express= require('express');
// const urlRoute=require('./routes/url_route');
// const staticRouter=require('./routes/staticRouter');
// const path=require('path');
// const {connectToMongoDB}=require('./connect_db');
// const URL=require('./models/url');
// const app=express();
// const PORT=8001;

// // connectToMongoDB(process.env.MONGO_URL).then(()=>console.log('Mongo DB is Connected'));

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URL;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// app.listen(PORT,()=>console.log(`Server Started at port:',${PORT}`));
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());

// app.set("view engine","ejs");
// app.set("views",path.resolve("./views"));

// app.use("/url",urlRoute);
// app.use('/',staticRouter);
// //setting the view engine


// //-------------if we don't use ejs,we have to do like this------//

// // app.get("/allEntry",async(req,res) => {
// //     const allUrls = await URL.find({});
// //     return res.end(`
// //         <html>
// //             <head>

// //             </head>
// //             <body>
// //                 <ol>
// //                     ${allUrls.map(url=>`<li>${url.shortId}-${url.redirectURL}-${url.visitHistory.length}</li>`).join('')}
// //                 </ol>
// //             </body>
// //         </html>
// //     `)
// // })

// app.get("/test",async(req,res) => {
//     const allUrls = await URL.find({});
//     return res.render("/homepage")
//     })




// app.get('/url/:shortID',async (req,res)=>{
//     const shortId=req.params.shortID;
//     const entry = await URL.findOneAndUpdate(
//         {shortId,},
//         {
//             $push:{
//                 visitHistory: {
//                     timestamp:Date.now()
//                 },
//             },
//         }
       
//     )
//      if (!entry){
//         return res.status(404).json({message:"URL not found"});
//         }
//    res.redirect(entry.redirectURL)    
// });

require('dotenv').config(); // Load .env first
const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect_db'); // Use your existing connection file
const urlRoute = require('./routes/url_route');
const staticRouter = require('./routes/staticRouter');
const URL = require('./models/url');

const app = express();
const PORT = 8001;

// 1. Check if the URL is loaded (Debugging step)
console.log("Mongo URL:", process.env.MONGO_URL); 

// 2. Connect using Mongoose (Required for URL.find to work)
// If .env fails, this line will throw an error immediately
if (!process.env.MONGO_URL) {
    console.error("Error: MONGO_URL not found in .env file");
    process.exit(1);
}

connectToMongoDB(process.env.MONGO_URL)
    .then(() => console.log('Mongo DB is Connected'))
    .catch((err) => console.log("Mongo Connection Error:", err));

// 3. Middleware (Must come before routes)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// 4. Routes
app.use("/url", urlRoute);
app.use('/', staticRouter);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    // FIX: Remove the leading slash. "homepage", not "/homepage"
    return res.render("homepage", { allUrls }); 
});

app.get('/url/:shortID', async (req, res) => {
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        }
    );
    
    // FIX: prevent crash if URL doesn't exist
    if (!entry) {
        return res.status(404).json({ message: "URL not found" });
    }
    
    res.redirect(entry.redirectURL);
});

// 5. Start Server (Always at the end)
app.listen(PORT, () => console.log(`Server Started at port: ${PORT}`));