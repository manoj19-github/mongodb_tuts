// create index with partial filter functionality
db.students.createIndex({marks:1},{partialFilterExpression:{marks:{$gte:60}}})
// create index for time to live 
db.students.createIndex({marks:1},{expireAfterSeconds:10})   // remove index  after 10 
