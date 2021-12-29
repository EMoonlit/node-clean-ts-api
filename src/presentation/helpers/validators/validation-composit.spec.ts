import { MissingParamError } from "../../errors"
import { Validation } from "./validation"
import { ValidationComposit } from "./validation-composit"

interface SutTypes {
  sut: ValidationComposit
  validationStub: Validation
}

const makeValidationStub = () => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return new MissingParamError('any_field')
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposit([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('any_field'))
  })
})