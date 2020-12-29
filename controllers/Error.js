exports.errorPageNotFound = (req, res, next) => {
    //res.status(404).send("<h1>Page Not Found!!!!</h1>")
    //res.status(404).sendFile(path.join(__dirname,'views','pageNotFound.html')); // This is HTML page
    res
      .status(404)
      .render("pageNotFound", { pageName: "404", pageTitle: "Page Not Found" });
  }