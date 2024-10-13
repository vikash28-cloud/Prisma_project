import { Response, Request } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";


export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User Already exists");
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.status(200).json({
    message: "user created successfully",
    data: user,
  });
};



export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      throw Error("invalid email or password");
    }
   
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw Error("Invalid email or password" );
    }

    
  
    res.status(200).json({ message: "User logged in successfully", user });
  };