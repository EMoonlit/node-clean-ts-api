export interface Encryper {
  encrypt(value: string): Promise<string>
}