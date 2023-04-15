import { openDB } from 'idb';

// initializes database, creates one if it doesn't exist
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connects to DB that was initialized in initdb
  const jateDB = await openDB("jate", 1);
  // creates transaction, can sets priviledge. In this case we want to be able to both read and write to the database
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // puts/writes to the database
  const request = store.put({ jate: content });
  // confirms the status and console.logs the result
  const result = await request;
  console.log("Data saved to the database", result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // connects to DB that was initialized in initdb
  const jateDB = await openDB("jate", 1);
  // creates transaction, can sets priviledge. In this case we want to only read
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // gets all data from database
  const request = store.getAll();
  // confirms the status and console.logs the result
  const result = await request;
  console.log(result);
};

// initializes the database to be used
initdb();
