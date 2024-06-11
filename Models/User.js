import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class User extends Model {
    static init(sequelize, DataTypes) {
        return sequelize.define('User', {
            userId: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userName: {
                type: DataTypes.STRING(255),
                allowNull: true,
                unique: 'User_userName_key'
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            pwd: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        }, {
            tableName: 'User',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: 'User_pkey',
                    unique: true,
                    fields: [
                        { name: 'userId' },
                    ]
                },
                {
                    name: 'User_userName_key',
                    unique: true,
                    fields: [
                        { name: 'userName' },
                    ]
                },
            ]
        });
    }
}
