var db = require("../models");

module.exports = function (app) {


app.get("/account", function(req, res) {
    // check session first
    if (req.session.user) {
      res.send(`welcome back, ${req.session.user.name}!`);
    }
    // then check cookie
    else if (req.headers.cookie.indexOf("token=") !== -1) {
      // use regex to grab cookie from headers string
      var cookie = req.headers.cookie.match(/(?<=token=)[^ ;]*/)[0];
      // compare cookie against db records
      db.Vendor.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      }).then(function(user) {
        if(user.token === cookie) {
          req.session.user = user;

          res.end();
        }
      });
      // for (var i = 0; i < users.length; i++) {
      //   if (users[i].token === cookie) {  
      //     // save user object on session for back-end to continue to use
      //     req.session.user = users[i];
    
      //     return res.redirect("/");
      //   }
      // }
  
      // no match, so clear cookie
      res.clearCookie("token");
      res.redirect("/");
    }
    // if no session or cookie, send initial login form
    else {
      res.redirect("/login");
        
    }
  });
  
//   app.get("/other", function(req, res) {
//     // only users with set session can see this route
//     if (req.session.user) {
//       res.send(`oh, it's ${req.session.user.name} again.`);
//     }
//     else {
//       res.redirect("/");
//     }
//   });
  
//   app.get("/logout", function(req, res) {
//     // clear cookie and session
//     res.clearCookie("token");
//     req.session.destroy();
  
//     res.redirect("/");
//   });
  
    app.post("/login", function(req, res) {
    
        // look for user that matches the posted username and password
        db.Vendor.findOne({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(user) {
            if(user) {
                console.log(req.body);
                var token = "t" + Math.random();
                user.token = token;

                res.cookie("token", token, {expires: new Date(Date.now() + 999999999)});
                req.session.user = user;

                res.end();
                
                console.log("Thank you for signing in!");
            }
            else {
                res.send("account not found");
            }
        });
    });

  app.get("/test", function(req, res) {

    console.log(req.session.user);
    res.end();
});

}