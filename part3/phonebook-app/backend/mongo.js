const mongoose = require('mongoose')

const [, , pass, newName, newNumber] = process.argv

if(!pass || pass.length < 3) {
  console.log('Please provide the password')
  process.exit(1)
}

const connectionString = `mongodb+srv://gcnicolas2024:${pass}@cluster0.avqgn.mongodb.net/fullStackOpenPhonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(connectionString)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = new mongoose.model('Person', personSchema)

if(!newName && !newNumber) {
  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(({ name, number }) => { console.log(`${name} ${number}`) })
    mongoose.connection.close()
  })
}
else {
  if(!newName || !newNumber) {
    console.log('ERROR: Content missing')
    process.exit(2)
  }
  else {
    const newPerson = new Person({
      name: newName,
      number: newNumber
    })

    newPerson.save().then(() => {
      console.log(`added ${newName} number ${newNumber} to phonebook`)
      mongoose.connection.close()
    })
  }
}