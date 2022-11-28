const mongoose = require('mongoose');

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://mrd2689a_full_stack_open:${password}@cluster0.2rdjo2h.mongodb.net/phone-book?retryWrites=true&w=majority`;

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Entry = mongoose.model('Entry', entrySchema);

if (process.argv.length === 3) { // if there is only one argument passed
    Entry.find({}).then(result => {
        result.forEach(entry => console.log(`${entry.name}: ${entry.number}`));
        mongoose.connection.close();
        process.exit(1);
    });
}
else if (process.argv.length === 5) {
    const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
    });
    
    entry.save().then(result => {
        console.log(`Added ${entry.name} with number ${entry.number} to phonebook`);
        mongoose.connection.close();
    });
}




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