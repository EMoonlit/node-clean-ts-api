import { InvalidParamError } from "../../errors"
import { ComprareFieldsValidation } from "./comprare-fields-validation"


interface SutTypes {
  sut: ComprareFieldsValidation
}

const makeSut = (): SutTypes => {
  const sut = new ComprareFieldsValidation('any_field', 'any_field_to_compare')
  return {
    sut
  }
}
describe('CompareField Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: 'any_valor',
      any_field_to_compare: 'wrong_valor',
    })
    expect(error).toEqual(new InvalidParamError('any_field_to_compare'))
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({
      any_field: 'any_valor',
      any_field_to_compare: 'any_valor',
    })
    expect(error).toBeFalsy()
  })
})