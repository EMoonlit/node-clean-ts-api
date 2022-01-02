import bcrypt from 'bcrypt'
import { Encryper } from '../../data/protocols/criptography/encrypter'

export class BcryptAdapter implements Encryper {
  private readonly salt: number
  constructor(salt: number) {
    this.salt = salt
  }
  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}