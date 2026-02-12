export const getProfile = async (req, res) => {
    res.json(req.user);
};

export const updateProfile = async (req, res) => {
    try {
        const user = req.user;

        user.name = req.body.name || user.name;
        await user.save();

        res.json({
            message: "Profile updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};