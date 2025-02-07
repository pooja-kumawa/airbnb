const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

// dfg
main()
.then(()=>{
console.log("connected to db")
})
.catch((err)  => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://localhost:27017/pro");
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>
{
    res.send("root is working");
});


//Index route
app.get("/listings",async (req,res)=>
{
    const allListings=await Listing.find({});
        res.render("./listings/index.ejs", {allListings});
    });


//new route
    app.get("/listings/new",async(req,res)=>{
        res.render("./listings/new.ejs");
    
    });



//show route
app.get("/listing/:id",async (req,res)=>
{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});

});

//create route
app.post("/listings",async(req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");

});

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing}) 
})

//update route
app.put("/listings/:id",async(req,res)=>
{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

//delete route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");

});








    


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"my new villa",
//         desciption:"by the beach",
//         price:1230,
//         location:"goa",
//         country:"India"

//     });
//      await sampleListing.save();
//      console.log("sample was asved");
//      res.send("successfull");

// });

app.listen(6766,()=>
{
    console.log("server is listening to port 6766");
});
