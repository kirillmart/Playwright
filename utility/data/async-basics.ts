import DB from '../db';

let database = new DB();

function getData() {
    return database.getQuery(`SELECT * FROM User;`);
}

setTimeout(getData, 1000);

async function run() {
    try {
        let value = await getData();
        console.log("Request completed", value);
    } catch (error) {
        console.log("Error: ", error );
    }
}

run();
