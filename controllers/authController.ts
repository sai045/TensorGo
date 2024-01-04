const authenticateGoogle = () => {
  passport.authenticate("google", { failureRedirect: "/" }),
    (req: any, res: any) => {
      res.redirect("/profile");
    };
};

exports.authenticateGoogle = authenticateGoogle;
