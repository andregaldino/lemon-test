const { calc } = require('../src/taxes')

describe('give 135.93 ', () => {
  const total = 135.93
  test('should return 12% icms', () => {
    const { icms } = calc(total)
    expect(icms).toBe(12)
  })

  test('should return 9.49 COSIP', () => {
    const { cip } = calc(total)
    expect(cip).toBe(9.49)
  })

  test('should return 188 KWH', () => {
    const { kwh } = calc(total)
    expect(kwh).toBe(188)
  })

})

describe('give 299.45 ', () => {
  const total = 299.45
  test('should return 21% icms', () => {
    const { icms } = calc(total)
    expect(icms).toBe(21)
  })

  test('should return 22.16 COSIP', () => {
    const { cip } = calc(total)
    expect(cip).toBe(22.16)
  })

  test('should return 365 KWH', () => {
    const { kwh } = calc(total)
    expect(kwh).toBe(365)
  })

})