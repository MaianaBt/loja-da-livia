const { User } = require('../../models');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user)
            return null;

        const validPassword = await user.checkPassword(password);
        if (!validPassword)
            return null;

        const { id, first_name, last_name } = user;

        return {
            user: {
                id,
                first_name,
                last_name,
                email
            },
            token: user.generateAuthToken()
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { login }