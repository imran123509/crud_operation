const City=require('../models/list');


const createNewCity=async(req, res)=>{
      const {name, state, national}=req.body;
    const CityName=await City.findOne({
         name
    });
    if(CityName){
        return res.status(401).json({
            message: "this city is already Exits"
        })
    }
    const cityInfo=await City.create({
         name,
         state,
         national
    });
    if(!cityInfo){
        return res.status(401).json({
            message: "something went wrong"
        })
    }
    res.status(201).json({
        message: "city Created successfullty"
    })
}

const UpdateCity=async(req, res)=>{
      if(!req.body){
           return res.status(401).json({
              message: "Data can not be empty"
           })
      }

      const id = req.query.id;

      try {
          const findbyidElement = await City.findByIdAndUpdate(id, req.body, { new: true, upsert: true });
          res.status(200).json({
              message: "Updated successfully",
              data: findbyidElement
          });
      } catch (error) {
          return res.status(500).json({
              message: "Error updating city",
              error: error.message
          });
      }
}

   const DeleteDataById=async(req, res)=>{
         const id=req.query.id;
         const removeByID=await City.findByIdAndDelete(id, { useFindAndModify: false });

         if(!removeByID){
              return res.status(401).json({
                  message: "can not be deleted with this id"
              })
         }

         res.status(200).json({
             message: "Deleted data successfully"
         })
   }

   const deleteAll=async(req, res)=>{
       const deleteData=await City.deleteMany({});

       if(!deleteData){
           return res.status(401).json({
               message: "Something went wrong"
           })
       }
       res.status(200).json({
          message: "all data deleted successfully"
       })
   }


const getallInfo=async(req, res)=>{
       const title=req.query.title;
       const condition=title? {title: {$regex: new RegExp(title), $options: "i" }}:{};
       const findall=await City.find(condition);
       if(!findall){
           return res.status(401).json({
             message: "something went wrong"
           })
       }
       res.status(200).json(findall)
}

const getOneInfo=async(req, res)=>{
    const id = req.query.id;
    const findOne = await City.findById(id);
    if (!findOne) {
        return res.status(404).json({
            message: "City not found"
        });
    }
    res.status(200).json(findOne);
}



module.exports={
    createNewCity,
    UpdateCity,
    getallInfo,
    getOneInfo,
    DeleteDataById,
    deleteAll
}