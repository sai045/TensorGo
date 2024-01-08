function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("http://localhost:3000/");
}

exports.isAuthenticated = isAuthenticated;
