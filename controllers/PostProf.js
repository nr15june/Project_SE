const Post = require('../models/PostProf');

//postPost
exports.postPostProf = async (req, res) => {
    const {
        Job_title,
        Job_description,
        Job_location,
        Job_building,
        Job_room,
        Job_time_start,  
        Job_time_end,   
        Count,           
        Reserve_count,
        Traveling_type,
        Food_Sup,
        Salary,
 
    } = req.body;
        try {
        const post = new Post({
            Job_title,
            Job_description,
            Job_location,
            Job_building,
            Job_room,
            Job_time_start,  
            Job_time_end,   
            Count,           
            Reserve_count,
            Traveling_type,
            Food_Sup,
            Salary,

        });
        const savedPost = await post.save();
        res.status(200).json(savedPost);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//UpdatePost
exports.editPostProf = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if(!post) return res.status(404).json({message: 'Post not found !'});
        const Edit = req.body;
        Object.assign(post, Edit);
        const updatePost = await post.save();
        res.json(updatePost);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//DeletePost
exports.deletePostProf = async (req,res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({message: 'Post not found !'});
        await Post.findByIdAndDelete(id);
        res.json({message : 'Post Deleted !'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
//GetAllPost
exports.getPostProf = async (req,res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//GetByFaculty
//GetByMajor
//GetBy...