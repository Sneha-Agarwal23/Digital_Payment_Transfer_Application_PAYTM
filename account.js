const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {authMiddleware} = require("../middleware");

const { Account} = require("../db");

router.get("/balance", authMiddleware, async (req, res) => {
    try{
        const account = await Account.findOne({
            userId: req.userId,
        });

        res.json({balance: account.balance});
    } catch(e) {
        res.status(404).json({msg : "Error fetching balance!! Try Later.."});
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {
    try{
        const {amount, to} = req.body;
        const senderAcc = await Account.findOne({ userId : req.userId });
        const receiverAcc = await Account.findOne({ userId: to });

        if(!senderAcc || !receiverAcc || senderAcc.balance < amount){
            throw new error(" Not enough money.. Invalid Transfer!!");
        }

        await Account.updateOne({userId: req.userId} , { $inc: { balance : -amount }});
        res.json({message: "Transfer Successfull"});
    } catch(e) {
        console.error(e);
        res.status(500);
    }
});

router.post("/updateBalance", authMiddleware, async (req, res) => {
    try{
        const {userId, amount} = req.body;

        await Account.updateOne({userId}, { $inc: {balance: amount }});
        res.json({msg: "Balance Updated"});
    } catch(e){
        console.error(e);
        res.status(500);
    }

});

/*
//https://stackoverflow.com/questions/51461952/mongodb-v4-0-transaction-mongoerror-transaction-numbers-are-only-allowed-on-a
router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const { amount, to } = req.body;

            // Fetch the accounts within the transaction
            const account = await Account.findOne({ userId: req.userId }).session(session);

            if (!account || account.balance < amount) {
                throw new Error("Insufficient balance");
            }

            const toAccount = await Account.findOne({ userId: to }).session(session);

            if (!toAccount) {
                throw new Error("Invalid account");
            }

            // Perform the transfer
            await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        });

        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        
        console.error("Error during transfer:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    } finally {
        session.endSession();
    }
});

*/

module.exports = router;