const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json');

class DataStore {
    // Read data from JSON file
    static read() {
        try {
            const data = fs.readFileSync(dataFilePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return {}; // If file doesn't exist, return empty object
        }
    }

    // Write data to JSON file
    static write(data) {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    }
}

module.exports = DataStore;