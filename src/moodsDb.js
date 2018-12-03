import Dexie from 'dexie';

const db = new Dexie('moodDb');
db.version(1).stores({
    moods: 'date,value,icon,color'
});

export default db;