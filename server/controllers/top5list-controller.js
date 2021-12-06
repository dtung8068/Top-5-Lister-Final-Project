const CommunityList = require('../models/communitylist-model');
const Top5List = require('../models/top5list-model');
const auth = require('../auth');
const User = require('../models/user-model');

createTop5List = (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }

    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }

    top5List
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}
createCommunityList = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Community List',
        })
    }
    const communitylist = new CommunityList(body);
    console.log("creating communityList: " + JSON.stringify(communitylist));
    communitylist.save().then(() => {
            return res.status(201).json({
                success: true,
                communitylist: communitylist,
                message: 'Community List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Community List Not Created!'
            })
        })
}
checkToken = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        if(loggedInUser) {
            return true;
        }
        else {
            return false;
        }
})
}

updateTop5List = async (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    const body = req.body;
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        top5List.name = body.name
        top5List.items = body.items
        top5List.published = body.published
        top5List.likes = body.likes
        top5List.dislikes = body.dislikes
        top5List.views = body.views
        top5List.comments = body.comments
        top5List
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: top5List._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })
    })
}

updateCommunityList = async(req, res) => {
    const body = req.body;
    CommunityList.findOne({ _id: req.params.id }, (err, communityList) => {
        communityList.name = body.name;
        communityList.items = body.items;
        communityList.published = body.published;
        communityList.likes = body.likes;
        communityList.dislikes = body.dislikes;
        communityList.views = body.views;
        communityList.comments = body.comments;
        communityList
        .save()
        .then(() => {
            console.log("SUCCESS!!!");
            return res.status(200).json({
                success: true,
                id: communityList._id,
                message: 'Community List updated!',
            })
        })
        .catch(error => {
            console.log("FAILURE: " + JSON.stringify(error));
            return res.status(404).json({
                error,
                message: 'Community List not updated!',
            })
        })
    })
}


deleteTop5List = async (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
    })
}
deleteCommunityList = async (req, res) => {
    CommunityList.findById({_id: req.params.id}, (err, communitylist) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        CommunityList.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: communitylist })
        }).catch(err => console.log(err))
    })
}

getTop5ListById = async (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, top5List: list })
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Top 5 Lists not found` })
        }
        
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
}
getTop5ListPairs = async (req, res) => {
    if(!checkToken(req, res)) {
        return res.status(401).json({
            success: false,
            error: 'Unauthorized',
        })
    }
    await Top5List.find({ }, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    ownerUsername: list.ownerUsername,
                    items: list.items,
                    published: list.published,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}
getCommunityListPairs = async (req, res) => {
    await CommunityList.find({ }, (err, communityLists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!communityLists) {
            console.log("!communityLists.length");
            return res
                .status(404)
                .json({ success: false, error: 'CommunityLists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in communityLists) {
                let list = communityLists[key];
                let pair = {
                    _id: list._id,
                    name: list.name,
                    items: list.items,
                    published: list.published,
                    likes: list.likes,
                    dislikes: list.dislikes,
                    views: list.views,
                    comments: list.comments,
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createTop5List,
    createCommunityList,
    updateTop5List,
    updateCommunityList,
    deleteTop5List,
    deleteCommunityList,
    getTop5Lists,
    getTop5ListPairs,
    getCommunityListPairs,
    getTop5ListById,
    checkToken
}