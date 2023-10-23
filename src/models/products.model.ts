import mongoose, { Schema } from "mongoose"

const productSchema: Schema = new Schema({
    sku: { type: Number, required: true, unique: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Hombre', 'Mujer'] },
    store: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    location: {
        hall: { type: Number, required: true },
        side: { type: String, required: true, enum: ['A', 'B'] },
        ubicationX: { type: Number, requiered: true, unique: true, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, 
        ubicationY: { type: Number, required: true, unique: true, enum: [1, 2, 3, 4, 5] }
    }
}, { collection: 'Products' })


export default mongoose.model('Products', productSchema)