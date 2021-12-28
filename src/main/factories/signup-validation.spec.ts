import { ComprareFieldsValidation } from '../../presentation/helpers/validators/comprare-fields-validation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { ValidationComposit } from '../../presentation/helpers/validators/validation-composit';
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/helpers/validators/validation-composit')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposit with all validations', async () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ComprareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposit).toHaveBeenCalledWith(validations)
  });
});