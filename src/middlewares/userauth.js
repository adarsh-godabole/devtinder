export const userAuth = (req,res,next)=>{

    const isAuth = req.header?.Auth=="AUTH"
    if(isAuth)
      next()
    else
    res.status(401).send("Unauthorised")
  
  }