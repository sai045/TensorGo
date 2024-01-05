function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

exports.isAuthenticated = isAuthenticated;
