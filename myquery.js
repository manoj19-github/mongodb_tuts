// create index with partial filter functionality
db.students.createIndex({marks:1},{partialFilterExpression:{marks:{$gte:60}}})
// create index for time to live 
db.students.createIndex({marks:1},{expireAfterSeconds:10})   // remove index  after 10 
// find data from array elements 
db.students.find({"tiffin.biriyani":{$gte:2}})
// find array with 3 element 
db.students.find({hobby:{$size:3}})
// find all elements that is present in the array with order wise
db.students.find({hobby:["sports","acting","travelling"]})
// find all elements that is present in the array without looking into array
db.students.find({hobby:{$all:{["sports","acting","travelling"]}}});
// find a particular subdocument from the parent document
db.students.find({tiffin:{$elemMatch:{pizza:2.5,burger:1}}})
// increment the field from any document 
db.students.updateMany({marks:{$eq:53}},{$inc:{marks:3}})
//  update the existing document that is matched other wise insert a new document 
db.students.updateOne({first_name:'Manoj'},{$set:{last_name:'santra',
email:'santramanoj201@gmail.com',gender:'male',ip_address:'0.171.120.118',
marks:90,rating:{avg:4.5},hobby:['singing','painting','coding']}},
{upsert:true})
// update matching array elements 
db.students.updateMany({tiffin:{$elemMatch:
    {kauchoori:1,rasgulle:2}}},
    {$set:{"tiffin.$.origin":"Indian"}})

// update all array elements based on condition
db.students.updateMany({gender:'Female'},{$inc:{'tiffin.$[].pizza':-1}})

// find and update matched array elements based on condition
db.students.updateMany({gender:{$eq:"Female"}},{$set:{"tiffin.$[self].ratings":4.5}},{arrayFilters:[{"self.pizza":{$gte:2}}]})

// find the object based on particular property exists 
db.students.find({"tiffin.origin":{$exists:true}})

// find a distinct property value 
db.students.distinct("gender")

// add one object to array of object 
db.students.updateOne({last_name:'Galpen'},{$push:{tiffin:{tea:2,biscuit:4}}})
// add multiple object to array of object 
db.students.updateOne({last_name:'Galpen'},{$push:{tiffin:{$each:[{'rice chicken':3},{biriyani:4},{coffe:3.5}]}}})
// add object which not present in the array 
db.students.updateOne({last_name:'Galpen'},{$addToSet:{tiffin:{$each:[{'rice chicken':3},{biriyani:4},{coffe:3.5}]}}})

// ***************************************    aggrgation framework ******************************** /// 

// find matching elements in the aggrgation
db.students.aggregate([ { $match: { gender: 'Female' } }])

// group all gender wise students whose hobby is sports 
db.students.aggregate([ { $match: { hobby:"sports"}},{$group:{_id:{gender:"$gender"},totalStudents:{$sum:1}}}])

// group all students based on their gender 
db.students.aggregate([ {$group:{_id:{gender:"$gender"},totalStudents:{$sum:1}}}])
// group all students based on their gender  and sport their result 
db.students.aggregate([ {$group:{_id:{gender:"$gender"},totalStudents:{$sum:1}}},{$sort:{totalStudents:1}}])
// aggrgate with project the data 
db.students.aggregate([{$project:{_id:0,gender:1,fullName:{$concat:["$first_name"," " ,"$last_name"]}}}])
