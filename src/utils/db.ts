import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lapr5:lapr5@lapr5db.iion6.mongodb.net/Lapr5DB?retryWrites=true&w=majority");
mongoose.Promise = global.Promise;


export default mongoose;