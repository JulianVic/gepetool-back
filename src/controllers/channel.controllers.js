import Channel from "../models/channel.model.js";

let respuestasPendientes = [];

const waitForNewChannel = (req, res) => {
    respuestasPendientes.push(res);
};

const notifyClients = (newChannel) => {
    for (let i = 0; i < respuestasPendientes.length; i++) {
        respuestasPendientes[i].status(201).json(newChannel);
    }

    respuestasPendientes = [];
};

const createChannel = async (req, res) => {
    const { name, description } = req.body;

    try {
        const channel = await Channel.findOne({ name });
        if (channel) {
            return res.status(400).json({ msg: "Channel already exists" });
        }

        const newChannel = new Channel({ name, description });
        await newChannel.save();

        notifyClients(newChannel);

        res.status(201).json({ msg: "Channel created" });
    } catch (error) {
        res.status(500).json({ msg: "Error in the server" });
        console.log(error);
    }
};

const getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in the server" });
    }
};

const deleteChannel = async (req, res) => {
    const idChannel = req.params.id;
    try {
        const channel = await Channel.findByIdAndDelete(idChannel);
        if (!channel) {
            return res.status(400).json({ message: "Channel not found" });
        }
        notifyClients(channel);
        res.status(200).json({ message: "Channel deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in the server" });
    }
};

export default {
    createChannel,
    getAllChannels,
    deleteChannel,
    waitForNewChannel,
};
