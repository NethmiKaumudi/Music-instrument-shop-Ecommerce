exports.protectedRoute = (req, res) => {
    res.send({ message: 'This is a protected route', user: req.user });
};
