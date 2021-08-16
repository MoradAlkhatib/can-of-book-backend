const mongoose=require("mongoose");



const bookSchema= new mongoose.Schema({
 title: String,
 description: String,
 status: String,
})
const ownerSchema= new mongoose.Schema({
    email: String,
    book:[bookSchema]
   })


const myBook=mongoose.model('book',bookSchema)
const myOwnerBook=mongoose.model('owner',ownerSchema)

const seedBook=()=>{
    const murat=new myOwnerBook({
        email: 'muradalkhateeb@icloud.com',
        book:[ {
            title: 'Java',
            description: 'talk about Java programming language',
            status: 'available',
           
        },
        {
            title: 'JavaScript',
            description: 'talk about JavaScript programming language',
            status: 'available',
           
        }]
       
        
    })

   
    murat.save()
      
    console.log(murat)

}

// seedBook();

module.exports=myOwnerBook;