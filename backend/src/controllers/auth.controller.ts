import { Request, Response } from "express";
import prisma from "../db/prisma";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      res.status(400).json({ error: "Please fill all the fields" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password don't match" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=[${username}]`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=[${username}]`;

    const newUser = await prisma.user.create({
      data: {
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (error: any) {
    console.error("Error in register", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.error("Error in register", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({ message: 'Logout successful' });    
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    } 
};

export const getMe = async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        })

        if(!user) {
            res.status(401).json({ message: 'User not found!' });
            return;
        }


        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username:user.username,  
            profilePic: user.profilePic,
            gender: user.gender
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
