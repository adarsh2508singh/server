const Joi= require("joi");
const passwordComplexity= require("joi-password-complexity");

const signUpBodyValidation = (body) => {
	const schema = Joi.object({
		fullName: Joi.string().label("fullName"),
		userEmail: Joi.string().email().required().label("userEmail"),
		userPassword: passwordComplexity().required().label("userPassword"),
	});
	return schema.validate(body);
};

const logInBodyValidation = (body) => {
	const schema = Joi.object({
		userEmail: Joi.string().email().required().label("userEmail"),
		userPassword: Joi.string().required().label("userPassword"),
	});
	return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
	const schema = Joi.object({
		refreshToken: Joi.string().required().label("Refresh Token"),
	});
	return schema.validate(body);
};

module.exports ={
	signUpBodyValidation,
	logInBodyValidation,
	refreshTokenBodyValidation,
};