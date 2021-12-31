import { makeLoginValidation } from './login-validation'
import { ValidationComposit } from '../../../presentation/helpers/validators/validation-composit'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { ComprareFieldsValidation } from '../../../presentation/helpers/validators/comprare-fields-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'

jest.mock('../../../presentation/helpers/validators/validation-composit')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposit with all validations', async () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  });
});