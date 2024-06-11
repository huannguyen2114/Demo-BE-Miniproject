export default async function logout(req, res) {
    try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ 'message': 'Logged out successfully' });
    } catch (error) {
        console.error(req.method, req.url, error);
        res.status(500).json(error);
    }
}

