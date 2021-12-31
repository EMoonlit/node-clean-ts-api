import { EmailValidation } from "../../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../../presentation/helpers/validators/validation";
import { ValidationComposit } from "../../../presentation/helpers/validators/validation-composit";
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposit => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposit(validations)
}