import * as sqlite3 from 'sqlite3';

export default class DB {
    private db: sqlite3.Database;
    constructor() {
        this.db = new sqlite3.Database('myDB');
        this.db.run(`CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY, username TEXT, password TEXT);`);
    }
    async executeQuery(query: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.run(query, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getQuery(query: string): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }); 
    }
}