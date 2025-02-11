const mongoose = require('mongoose')

/* const [, , pass, newName, newNumber] = process.argv

if(!pass || pass.length < 3) {
  console.log('Please provide the password')
  process.exit(1)
}

const connectionString = `mongodb+srv://gcnicolas2024:${pass}@cluster0.avqgn.mongodb.net/fullStackOpenPhonebook?retryWrites=true&w=majority&appName=Cluster0` */

const connectionString = process.env.MONGO_URI

mongoose.set('strictQuery', false)

mongoose.connect(connectionString)
  .then(() => console.log('Mongodb connected'))
  .catch(() => console.log('ERROR: Mongodb connection failed'))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Name should have at least 3 characters'],
    trim: true
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
    trim: true,
    minLength: [8, 'Number should have at least 8 characters'],
    validate: [(val) => /^\d{2,3}\-\d+$/.test(val), 'Malformed number']
  }
})

personSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString(),
    delete retObj._id,
    delete retObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

/* if(!newName && !newNumber) {
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
} */