import Channel from "../models/channel.model.js";

const createChannel = async (req, res) => {
    const { name, description } = req.body;
    
    try {

        const channel = await Channel.findOne({ name });
        if (channel) {
            return res.status(400).json({ msg: "Channel already exists" });
        }

        const newChannel = new Channel({ name, description });
        await newChannel.save();
        
        res.status(201).json({ msg: "Channel created" });
    } catch (error) {
        res.status(500).json({ msg: "Error in the server" });
    }
    }

const getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in the server" });
    }
}

export default {
    createChannel,
    getAllChannels
}
