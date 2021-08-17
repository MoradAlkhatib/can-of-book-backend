
const myOwnerBook=require('../module/book.module');
let booksArr=[
    {
        title: 'Java',
        description: 'talk about Java programming language',
        status: 'available',
       
    },
    {
        title: 'JavaScript',
        description: 'talk about JavaScript programming language',
        status: 'available',
       
    }
]
let bookController=(req,res)=>{
    const book=booksArr.map(obj=>{
        return new Book({
            title: obj.title,
            description: obj.description ,
            status: obj.status,
            
        })

    })


res.json(book)
}

module.exports=bookController