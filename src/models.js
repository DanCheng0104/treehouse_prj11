"use strict";
//validation link
//http://fiznool.com/blog/2014/04/23/mongoose-validations/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
	fullName: { type:String, required: true},
	emailAddress: {
		type:String, 
		unique:true,
	    validate: function(email) {
      		return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    	}},
	password: {type:String, required: true}
});

UserSchema.plugin(uniqueValidator);

const ReviewSchema = = new Schema({
	postedON:{type:Date,default: Date.now},
	user:{type: Schema.Types.ObjectID, ref: 'Users'},
	rating:{type:Number,required:true,min:1,max:5},
	reviews:String
});
const CourseSchema = new Schema({
	user: {type: Schema.Types.ObjectID, ref: 'Users'},
	title:{type: String, required: true},
	description:{type: String, required: true},
	estimatedTime:{type:String},
	materialsNeeded:{type:String},
	steps:[{stepNumber:Number, title:{type:String,required:true},description:{type:String,required:true}}]
	reviews:[{type: Schema.Types.ObjectID, ref: 'Review'}]
});

module.exports = mongoose.model("Users", UserSchema);
module.exports = mongoose.model("Course", CourseSchema);
module.exports = mongoose.model("Review", ReviewSchema);