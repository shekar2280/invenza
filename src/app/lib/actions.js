"use server"

import { revalidatePath } from "next/cache";
import { Product, Transaction, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export const addUser = async (formData) => {
    const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try{
        await connectToDB();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username, email, password: hashedPassword, phone, address, isAdmin, isActive
        });
        await newUser.save();
    } catch(err) {
        console.log(err);
        throw new Error("Failed to create user!");
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
    const {id, username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);

    try{
        await connectToDB();

        const updateFields = {
            username, email, password, phone, address, isAdmin, isActive,
        };

        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);

        await User.findByIdAndUpdate(id,updateFields);
    } catch(err) {
        console.log(err);
        throw new Error("Failed to update user!");
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
};


export const addProduct = async (formData) => {
    const {title,desc,cat,price,stock,color,expiryDate} = Object.fromEntries(formData);

    const priceNumber = parseFloat(price);
    const stockNumber = parseInt(stock);
    const expiryDateFormatted = new Date(expiryDate); 
     
    try{
        await connectToDB();

        const newProduct = new Product({
            title,desc,cat,price:priceNumber,stock:stockNumber,color,expiryDate:expiryDateFormatted,
        });
        console.log(expiryDate);
        await newProduct.save();
    } catch(err) {
        console.log(err);
        throw new Error("Failed to create product!");
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};

//Update Details of Single Product
export const updateProduct = async (formData) => {
    const {id,title,desc,cat,price,stock,color,expiryDate} = Object.fromEntries(formData);

    try{
        await connectToDB();

        const updateFields = {
            title,desc,cat,price,stock,color,expiryDate,
        };

        Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);

        await Product.findByIdAndUpdate(id,updateFields);
    } catch(err) {
        console.log(err);
        throw new Error("Failed to update product!");
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try{
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
        throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try{
        connectToDB();
        await Product.findByIdAndDelete(id);
    } catch(err) {
        console.log(err);
        throw new Error("Failed to delete product!");
    }

    revalidatePath("/dashboard/products");
};

// ADD TRANSACTION
export const addTransaction = async (formData) => {
    const { date, desc, amount, category, status, transaction_id, customer_type } = Object.fromEntries(formData);

    const finalAmount = parseFloat(amount);
    const transactionDateFormatted = new Date(date);
    console.log(category);
    try {
        await connectToDB();

        const newTransaction = new Transaction({
            date: transactionDateFormatted,
            desc,
            amount: finalAmount,
            category,
            status,
            transaction_id,
            customer_type,
        });
        await newTransaction.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to create transaction!");
    }

    revalidatePath("/dashboard/transactions");
    redirect("/dashboard/transactions");
};

// UPDATE TRANSACTION
export const updateTransaction = async (formData) => {
    const { id, date, desc, amount, category, status, transaction_id, customer_type } = Object.fromEntries(formData);

    try {
        await connectToDB();

        const updateFields = {
            date: date ? new Date(date) : undefined,
            desc,
            amount: amount ? parseFloat(amount) : undefined,
            category,
            status,
            transaction_id,
            customer_type,
        };

        // Remove any undefined or empty fields
        Object.keys(updateFields).forEach((key) => 
            (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]
        );

        await Transaction.findByIdAndUpdate(id, updateFields);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update transaction!");
    }

    revalidatePath("/dashboard/transactions");
    redirect("/dashboard/transactions");
};