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
db.users.updateMany({hobbies:{$elemMatch:{title:"Sports",frequency:{$gt:2}}}},{$set:{"hobbies.$[self].isSportsMan":true}}
,{arrayFilters:[{"self.frequency":{$gt:2}}]})

//  find data that age is exists and age is not null 
db.users.find({age:{$exists:true},age:{$ne:null}})
db.users.find({age:{$exists:true,$ne:null}})

// search text based on regex pattern
db.flights.find({summary:{$regex:/VAMPiRISM/gmi}})


//add new element to the array elements
db.users.updateOne({name:"Anna"},{$push:{hobbies:{$each:[{title:"Coding",frequency:4.5}]}}})
// find the object based on particular property exists 
db.students.find({"tiffin.origin":{$exists:true}})

// find a distinct property value 
db.students.distinct("gender")
// find all document that have one subdocument of hobbies which are match these conditions 
db.users.find({hobbies:{$elemMatch:{title:"Sports",frequency:3}}})
//match elements and add one more property to the element
> db.users.updateMany({hobbies:{$elemMatch:{title:"Cooking",frequency:{$gte:5}}}},{$set:{"hobbies.$.isReach":true}})
//find all documents when a particular array items is exists in these array
 db.flights.find({genres:{$all:['Drama', 'Horror']}})
// add one object to array of object 
db.students.updateOne({last_name:'Galpen'},{$push:{tiffin:{tea:2,biscuit:4}}})
// add multiple object to array of object 
db.students.updateOne({last_name:'Galpen'},{$push:{tiffin:{$each:[{'rice chicken':3},{biriyani:4},{coffe:3.5}]}}})
// add object which not present in the array 
db.students.updateOne({last_name:'Galpen'},{$addToSet:{tiffin:{$each:[{'rice chicken':3},{biriyani:4},{coffe:3.5}]}}})
// update collection based on conditions 
db.flights.updateMany({$expr:{$gte:["$tvrage","$externals.thevdb"]}},{$mul:{"externals.thetvdb":1.4}})

//update all elements within the array 
db.users.updateMany({"hobbies.frequency":{$gt:2}},{$inc:{"hobbies.$[].frequency":2}})
// update first element within the array 
db.users.updateMany({"hobbies.frequency":{$gt:2}},{$inc:{"hobbies.$.frequency":2}})
// update specific elements with addToSet method
db.users.updateMany({name:'Max'},{$addToSet:{hobbies:{title:'coding',frequency:5}}})


// apply rejex to search data
db.flights.find({summary:{$regex:/thriller/}})

// using slice on array 
 db.users.find({id:{$lte:12}},{sports:{$slice:[1,2]},first_name:1,last_name:1})

// projection in document array 
db.users.find({name:"Chris"},{hobbies:{$elemMatch:{$eq:"Sports"}}})

// upsert data in database
db.users.updateMany({name:"Manoj"},
{$set:{hobbies:[{title:"Cricket",frequency:4.7}],phone:'9748159138',age:26}},
{upsert:true})

// increment data 
db.users.updateMany({marks:{$gte:50}},{$inc:{marks:1}})

//  find and update all array element 
db.users.updateMany({$and:[{id:{$lte:5}},{"hobbies.name":"cricket"}]},{$set:{"hobbies.$[].rating":1.5}})

// elemMatch 
db.users.updateMany({hobbies:{$elemMatch:{"title":"Cricket"}}},{$set:{"hobbeis.$.title":"cricket"}})
 // update all array elements 
 db.users.updateMany({hobbies:{$elemMatch:{frequency:{$gte:3}}}},{$set:{"hobbies.$[].grade":'A'}})

// rename a field 
db.users.updateOne({hobbeis:{$exists:true}},{$rename:{hobbeis:"hobbies"}})
// update a particular array element 
db.users.updateMany({hobbies:{$elemMatch:{title:'cricket',frequency:{$gte:4.0}}}},{$set:{"hobbies.$.isSportsMan":true}})

// UPDATE A SPECIFIC ARRAY ELEMENT 
db.users.updateMany({name:{$regex:/^ma/i}},{$set:{'hobbies.$[self].nationality':'Indian'}},{arrayFilters:[{'self.title':{$regex:/^cricket$/i}}]})

// add new element to the existing document array 
db.users.updateMany({name:'Manoj'},{$push: {hobbies:{$each:[{title:'swimming',frequency:6},{title:'drawing',frequency:4.8},{title:'coding',frequency:4.5}],$sort:{frequency:-1}}}})

// remove a specific element from the existing document array 
db.users.updateMany({name:{$regex:/^ma/i}},{$pull:{hobbies:{title:'coding',frequency:4.5}}})
// add only unique elements to the existing document array
db.users.updateMany({name:{$eq:'Manoj'}},{$addToSet:{hobbies:{title:'cricket',frequency:4.5}}})

// update specific element in the document 
db.users.updateMany({marks:{$lte:55},hobbies:{$exists:true}},{$set:{"hobbies.$[self].rating":3.5}},{arrayFilters:[{"self.rating":3.3}]})

// add additional element in the document 
db.users.updateMany({marks:{$in:[38,55]}},{$push:{hobbies:{$each:[{name:'football',rating:3.2},{name:'badminton',rating:3.8}],$sort:{rating:-1}}}})
 // remove an array element 
 db.users.updateMany({marks:{$in:[38,55]}},{$pull:{hobbies:{name:'football',rating:3.2}}})
// create partial index 
db.users.createIndex({marks:1},{partialFilterExpression:{gender:'Male'}})
db.users.createIndex({email:"text"})
 db.users.find({$text:{$search:"elpais"}})

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

// aggregate for group by 
db.users.aggregate([{$match:{gender:'Male'}},{$group:{_id:{car:"$car"},totalPersons:{$sum:1}}}])

// aggreate group by with sort
db.users.aggregate([{$match:{gender:'Male'}},{$group:{_id:{car:"$car"},totalPersons:{$sum:1}}},{$sort:{totalPersons:-1}}])

db.users.aggregate([{$match:{gender:"Female"}},{$group:{_id:{gender:"$gender"},totalMarks:{$sum:1}}}])


ProductsStatModel.aggregate([
    { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'info' } }
]);

db.users.aggregate([{$project:{_id:0,full_name:{$concat:[{$toUpper:"$first_name"},"  " ,{$toUpper:"$last_name"}]}}}])

db.users.aggregate([
    {
        $project:{
            _id:0,
            gender:1,
            fullName:{
                $concat:[
                    {
                        $toUpper:{
                            $substrCP:[
                                "$first_name",0,1
                            ]
                        }
                    },
                    {
                        $substrCP:[
                            "$first_name",1,
                                {
                                    $subtract:[
                                        {$strLenCP:"$first_name"},1]
                                }
                            ]
                    },
                    " ",
                    {
                        $toUpper:{
                            $substrCP:[
                                "$last_name",0,1
                            ]
                        }
                    },
                    {
                        $substrCP:[
                            "$last_name",1,
                                {
                                    $subtract:[
                                        {$strLenCP:"$last_name"},1]
                                }
                            ]
                    },
                ]
            }
        }
    }
])

// get all hobbies array group by age 
db.students.aggregate([{ $group: { _id:{age: "$age" }, allHobies: { $push: "$hobbies" }} }])
// get all hobbies array group by age and remove duplicate value
db.students.aggregate([{$unwind:"$hobbies"},{ $group: { _id:{age: "$age" }, allHobies: { $addToSet: "$hobbies" }} }])


//getting the length of an array by projection
db.students.aggregate([{$project:{_id:0,noOfHobbies:{$size:"$hobbies"}}}])

// get all student data which have obtained marks 60 or above
db.students.aggregate([{$project:{_id:1,name:1,examScore:{$filter:{input:"$examScores",as:"self",cond:{$gte:["$$self.score",60]}}}}}])


