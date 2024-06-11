export function mapUser(user) {
    return {
        userId: user.userId,
        userName: user.userName,
        name: user.name,
        isAdmin: user.isAdmin
    };
}