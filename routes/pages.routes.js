import { Router } from "express";

// create a new router for these routes
const pagesRouter = Router();

pagesRouter.get("/shop", (req, res) => {
    res.render("shop");
});

pagesRouter.get("/essential", (req, res) => {
    res.render("essential");
});

pagesRouter.get("/about", (req, res) => {
    res.render("about");
});

pagesRouter.get("/contact", (req, res) => {
    res.render("contact");
});

export {pagesRouter as pagesRouter}