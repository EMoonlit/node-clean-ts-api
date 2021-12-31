import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { ValidationComposit } from '../../../presentation/helpers/validators/validation-composit'
import { ComprareFieldsValidation } from '../../../presentation/helpers/validators/comprare-fields-validation';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';

export const makeSignUpValidation = (): ValidationComposit => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ComprareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposit(validations)
}