const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const user = require('./users');
const jobs = require('./jobs');

const Applications = sequelize.define('Applications',{
    application_id:{
        type:DataTypes.STRING,
        primaryKey:true
    },
    job_id:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model:jobs,
            key:'job_id',
            onDelete:'CASCADE'
        }
    },
    applicant_id:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model:user,
            key:'user_id',
            onDelete:'CASCADE'
        }
    },
    application_status:{
        type:DataTypes.ENUM('PENDING','APPROVED','REJECTED'),
        allowNull:false
    },
    application_date:{
        type:DataTypes.DATE,
        allowNull:false
    }

},{
    timestamps:false
});

Applications.belongsTo(jobs,{foreignKey:'job_id'});
Applications.belongsTo(user,{foreignKey:'applicant_id'});

module.exports = Applications;