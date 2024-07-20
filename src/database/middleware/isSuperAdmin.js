export const isSuperAdmin = (req, res, next) => {
    try {
      if(req.tokenData.role !== 'super_admin') {
        return res.status(403).json(
          {
            success: false,
            message: "You are not allowed"
          }
        )
      }
  
      next()
    } catch (error) {
      res.status(500).json(
        {
          success: false,
          message: "You are not allowed"
        }
      )
    }
  }