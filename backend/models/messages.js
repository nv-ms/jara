const sequelize = require('../config/database');
const {DATATYPES} = require('sequelize');
const users = require('./users');

const messages = sequelize.define('messages',{
    message_id:{
        type:DATATYPES.STRING,
        primaryKey:true
    },
    sender_id:{
        type:DATATYPES.STRING,
        allowNull:false,
        references:{
            model:users,
            key:"user_id"
        }
    },
    reciever_id:{
        type:DATATYPES.STRING,
        allowNull:false,
        references:{
            model:users,
            key:"user_id"
        }
    },
    message_subject:{
        type:DATATYPES.STRING,
        allowNull:true
    },
    message_content:{
        type:DATATYPES.STRING,
        allowNull:false
    },
    message_timestamp:{
        type:DATATYPES.TIME,
        allowNull:false
    }
},{
    timestamps:false
});

messages.belongsTo(users,{foreignKey:'sender_id'});
messages.belongsTo(users,{foreignKey:'reciever_id'});

module.exports = messages;

