// const {MongoClient} = require('mongodb')

// const url = 'mongodb://127.0.0.1:27017'
// const dbName = 'wpu';


// const client = new MongoClient(url);



// client.connect((error,client) => {
//     if(error){
//         return console.log('koneksi gagal')
//     }
//     // pilih db
//     const db = client.db(dbName);
//     // menambahkan 1 data
//     db.collection('mahasiswa').insertOne({
//         nama: 'erik',
//         email: 'sV7YH@example.com'
//     },
//     (error,result) => {
//         if(error){
//             return console.log('data gagal ditambahkan')
//         }
//         console.log(result)
//     })
// })

const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(url);

async function main() {
    try {
        // Menghubungkan ke server
        await client.connect();
        console.log('Koneksi berhasil');

        // Memilih database
        const db = client.db(dbName);

        // Menambahkan satu data
        const result = await db.collection('mahasiswa').insertOne({
            nama: 'erik',
            email: 'sV7YH@example.com'
        });

        console.log('Data berhasil ditambahkan:', result);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    } finally {
        // Menutup koneksi
        await client.close();
    }
}

main().catch(console.error);

