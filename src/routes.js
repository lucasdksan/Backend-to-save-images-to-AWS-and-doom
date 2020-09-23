const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const db = require('./database/connection');
const fs = require('fs');
const path = require('path');
const aws = require('aws-sdk');

routes.get('/posts', async (req, res)=>{
    const Posts = await db('posts');
    try{
        return res.json(Posts);
    } catch(err){
        return res.status(400).json({error: 'Listing error'});
    }
});
routes.delete('/posts/:id',async (req, res)=>{
    const { id }= req.params;
    const s3 = new aws.S3();
    const trx = await db.transaction();
    const posts = await trx('posts').where('posts.id', '=', id).first();
    try{
        if(process.env.STORAGE_TYPE === 's3'){
            return s3.deleteObject({
                Bucket: '', //nome do seu bucket
                Key: posts.key
            });
        } else {
            console.log(posts.key);
            fs.unlink(path.resolve(__dirname, '../', 'temp', 'uploads', posts.key), function(err){
                if(err) throw err;
            });
        }
        await trx('posts').where('posts.id', '=', id)
                            .first()
                            .delete();
        await trx.commit();
        return res.json({message: 'Deleted item'});
    } catch(err){
        console.log(err);
        return res.status(400).json({error: 'Error deleting the post'});
    }
});
routes.post('/posts', multer(multerConfig).single('file'), async (req, res)=>{
    const { originalname: name, size, key, location: url= "" } = req.file;
    const trx = await db.transaction();
    try{
        await trx('posts').insert({
            name,
            size,
            key,
            url
        });
        const post = await trx('posts').where('posts.name', '=', name).first();
        if(post.url == ""){
            await trx('posts').where('posts.name', '=', name)
                                .first()
                                .update({url: `${process.env.APP_URL}/files/${key}`});
        }
        await trx.commit();
        return res.json({message: 'okay'});
    } catch(err){
        return res.status(400).json({error: 'Error in posts'})
    }
});
routes.get('/', (req, res)=>{
    return res.json({message: 'deucerto'});
});
module.exports = routes;