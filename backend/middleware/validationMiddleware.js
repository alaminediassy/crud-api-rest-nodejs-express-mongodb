const { body, validationResult } = require('express-validator');

const validateCreateStudent = [
  body('name').notEmpty().withMessage('Le prénom est obligatoire'),
  body('phone').notEmpty().withMessage('Le numéro de telephone est obligatoire'),
  body('email').isEmail().withMessage('L\'adresse email n\'est pas valide'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports =  validateCreateStudent;
