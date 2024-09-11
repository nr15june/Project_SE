const Post = require('../models/PostStu');

//postPost
exports.postPostStu = async (req, res) => {
    const {
        St_skill,
        St_ability,
        St_work_time 
    } = req.body;
        try {
        const post = new Post({
            St_skill,
            St_ability,
            St_work_time 
        });
        const savedPost = await post.save();
        res.status(200).json(savedPost);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//UpdatePost
exports.editPostStu = async (req,res) => {
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
exports.deletePostStu = async (req,res) => {
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
exports.getPostStu = async (req,res) => {
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