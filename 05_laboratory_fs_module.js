const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.log("File does not exist", err);
    }
    else {
        console.log("Data: ", data);
    }   
});

fs.writeFile('sample.txt', 'Hello, Node.js!\n', (err) => {
    if (err) 
        return console.log("Error writing to file", err);
    console.log("File written successfully");


fs.appendFile('sample.txt', 'Appended text.', (err) => {
        if (err) return console.log("Error appending to file", err);
        console.log("File appended successfully");

    setTimeout(() => {
        fs.unlink('sample.txt', (err) => {
            if (err) {
                console.log("Error deleting sample.txt", err);
            } else {
                console.log("File deleted successfully");
            }
        });
    }, 3000);
});
});

