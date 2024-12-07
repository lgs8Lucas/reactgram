const { body } = require("express-validator");

const userCreateValidation = () => {
	return [
		body("name")
			.isString()
			.withMessage("O nome é obrigatório.")
			.isLength({ min: 3 })
			.withMessage("O nome precisa ter pelo menos 3 caracteres."),
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Insira um email válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter pelo menos 5 caracteres."),
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((val, {req}) =>{
                if (val != req.body.password) {
                    throw new Error("As senhas não são iguais.")
                }
                return true;
            })
	];
};

module.exports = {
	userCreateValidation,
};
