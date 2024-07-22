const Story = require('../model/story')
const sanitizeHtml = require('sanitize-html');



const addPage = (req, res)=>{
    res.render('stories/add')

}

const addStory = async (req, res) =>{
    try {
        req.body.user = req.user.id
        req.body.body = sanitizeHtml(req.body.body, {
            allowedTags: [], 
            allowedAttributes: {}
        });
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
}

const showStories = async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();

        res.render('stories/index', {
            stories,
            loggedUser: req.user
        });
    } catch (err) {
         return res.render('error/500')
    }
}

const editStory = async (req, res)=>{
    try {
        const story = await Story.findById(req.params.id).lean();

        if (!story) {
            return res.render('error/404')
        }

        if (story.user != req.user.id) {
            res.redirect('stories')
            
        }
        else{
            res.render('stories/edit', { story, loggedUser: req.user });
        }
        
    } catch(error){
       return  res.render('error/404')
    }
   

}

const updateStory = async (req, res)=>{
    try {
        let story = await Story.findById( req.params.id).lean()
        if (!story) {
            return res.render('error/404')
        }
        if (story.user != req.user.id) {
            res.redirect('stories')
            
        }
        else{
            story = await Story.findOneAndUpdate({ _id: req.params.id}, req.body, {
                new: true,
                runValidators: true
             })

            res.redirect('/dashboard')

        }
        } catch (error) {
           return  res.redirect('error/404')
      }   

}

const deleteStory = async  (req, res)=>{
    try {
        await Story.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard')
        } catch (err) {
        res.redirect('/error/500')
    }
    

}

const showOneStory = async  (req, res)=>{
    try {
        let story = await Story.findById(req.params.id)
        .populate('user')
        .lean()

        if (!story) {
            return res.render('error/404')
        }

        res.render('stories/show', {story})
        } catch (error) {
            return res.render('error/404')
     }
       

}

const showMoreStory = async  (req, res)=>{
    try {
        const stories = await Story.find({user: req.params.userId, status: 'public'})
        .populate('user')
        .lean()

        res.render('stories/index', {
            stories
        })       
        } catch (error) {
            return res.render('error/404')
            }

         

}
module.exports = {
    addPage,
    addStory,
    showStories,
    editStory,
    updateStory,
    deleteStory,
    showOneStory,
    showMoreStory

}