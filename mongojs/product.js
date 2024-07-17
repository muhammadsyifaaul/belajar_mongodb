const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
.then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

const productSchema = new mongoose.Schema({
    name : {
		type: String,
        required: true
		
		},
        brand: {
            type: String,
            required: true
        },
		price: {
            type: Number,
            required: true
        },
		color: {
            type: String,
            required: true
        },
		size: [{
            type: String,
            required: true
        }],
		description: {
            type: String,
            required: true,
            maxlength: 150
        },
		condition: {
            type: String,
            enum: ['baru','bekas'], // enum = pilihan
            default: 'baru'
        },
		stock: {
            type: Number,
            required: true,
            min: [0, 'nilai tidak boleh minus']
        },
		availability: {
			online: {
                type: Boolean,
                required: true
            },
			offline: {
                type: Boolean,
                required: true
            }
	}
    // price: {
    //     type: Number,
    //     required: true
    // }
})


// const tshirt = new Product({
//     "name": "Kemeja Flanel",
//     "brand": "Hollister",
//     "price": 750000,
//     "color": "biru muda",
//     "size": ["S", "M", "L"],
//     "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//     "condition": "baru",
//     "stock": 25,
//     "availability": {
//         "online": true,
//         "offline": true
//     }
// },)

// tshirt.save()
// .then(res => console.log(res))
// .catch(err => console.log(err))


// Product.findOneAndUpdate({name : 'Kemeja Flanel'},
//     {
// 		"name": "Kemeja Flanel",
// 		"brand": "Hollister",
// 		"price": 150000,
// 		"color": "biru muda",
// 		"size": ["S", "M", "L"],
// 		"description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
// 		"condition": "baru",
// 		"stock": -5,
// 		"availability": {
// 			"online": true,
// 			"offline": true
// 		}
// 	}, {new:true, runValidators:true}
// ).then(res => console.log(res))
// .catch(err => console.log(err.errors.stock.properties.message))



// productSchema.methods.outStock = function() {
//     this.stock = 0
//     this.availability.online = false
//     this.availability.offline = false
//     return this.save()
// }

// const Product = mongoose.model('Product',productSchema)
// const changeStock = async (id) => {
//     const foundProduct = await Product.findById(id)
//     await foundProduct.outStock();
//     console.log('berhasil diubah')
// }
productSchema.statics.closeStore = function() {
    console.log("closeStore method called");
    return this.updateMany({}, {
        stock: 0,
        "availability.online": true,
        "availability.offline": true
    });
}

// Buat model setelah metode statis ditambahkan
const Product = mongoose.model('Product', productSchema);

// Panggil metode statis
Product.closeStore()
    .then(res => {
        console.log("Update result:", res);
    })
    .catch(err => {
        console.log("Update error:", err);
    });