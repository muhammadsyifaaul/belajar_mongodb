const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
.then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

const personSchema = mongoose.Schema({
    first_name: String,
    last_name: String
})

personSchema.virtual('fullName').get(function() {
    return `${this.first_name} ${this.last_name}`
})


personSchema.pre('save',async function() {
    this.firstName = 'samsul'
    console.log('persiapan menyimpan')
})
personSchema.post('save',async function() {
    this.lastName = 'ujang'
    console.log('data berhasil disimpan')
})
console.log()

const Person = mongoose.model("Person", personSchema)

// const person = new Person({
//     first_name: 'harry',
//     last_name: 'potter'
// })
const person = new Person({
    firstName: 'harry',
    lastName: 'potter'
})
person.save()
.then(res => console.log(res))