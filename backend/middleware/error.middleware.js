const notFoundUrl = (req, res, next) => {
  const error = new Error(`Url not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandle = (err, req, res, next) => {
  //sometimes we might get a 200 response, even though it's an error
  //send status: res.status ~ get status: res.statusCode
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export const ErrorMiddleware = { notFoundUrl, errorHandle }
