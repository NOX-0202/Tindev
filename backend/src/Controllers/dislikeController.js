const dev = require('../model/dev');

module.exports = {
    async store(req, res){
        /*console.log(req.params.devId); 
        console.log(req.headers.user);*/

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await dev.findById(user);
        const targetDev = await dev.findById(devId);

        if (!targetDev){
            return res.status(400).json({ error: "Dev not exists"});
        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save()
        
        
        return res.json(loggedDev);
    }
};