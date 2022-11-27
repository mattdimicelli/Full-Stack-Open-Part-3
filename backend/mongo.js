const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://mrd2689a_full_stack_open:${password}@cluster0.2rdjo2h.mongodb.net/phone-book?retryWrites=true&w=majority`;

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
    important: Boolean,
});

const Entry = mongoose.model('Entry', entrySchema);

// const note = new Note({
//     content: 'HTML is Easy',
//     date: new Date(),
//     important: true,
// });

// note.save().then(result => {
//     console.log('note saved!');
//     mongoose.connection.close();
// });

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note);
//     });
//     mongoose.connection.close();
// });