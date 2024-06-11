export default async function logout(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}