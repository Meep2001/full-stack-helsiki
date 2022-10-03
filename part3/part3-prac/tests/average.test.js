const average=require('../utils/for_testing').average

describe('average',() => {
  test('of one value itself',() => {
    const result=average([1])
    expect(result).toBe(1)
  })

  test('of to many values',() => {
    expect(average([1,2,3,4,5,6])).toBe(3.5)
  })

  test('of empty array',() => {
    expect(average([])).toBe(0)
  }
  )
})