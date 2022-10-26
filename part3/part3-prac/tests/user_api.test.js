const bcrypt=require('bcrypt')
const { application } = require('express')
const User=require('../models/user')
const helper=require('../tests/tests_helper')
const app=require('../app')
const supertest=require('supertest')
api=supertest(app)

describe('when there is initially one user in the db', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    const passwordHash=await bcrypt.hash('sekret',10)
    const user=new User({ username:'root',passwordHash })
    await user.save()

  })

  test('creation suceeds with a fresh username',async () => {
    const usersAtStart=await helper.usersInDb()
    const newUser={
      username:'aaaa',
      name:'aaaa',
      password:'aaa'
    }
    await api.post('/api/users/').send(newUser).expect(201).expect('Content-Type',/application\/json/)
    const usersAtEnd=await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    const usernames=usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuserror if user already exists', () => {
    const usersAtStart=helper.usersInDb()

  })
})


