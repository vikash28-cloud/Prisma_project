import { Response, Request } from "express";
import { prismaClient } from "..";
import {hashSync,compareSync} from "bcrypt";

export const login = async(req: Request, res: Response)=> {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        res.send("invalid email or password");
    }

    
    
   
};

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
      password: hashSync(password,10)
    },
  });
  res.status(200).json({
    message:"user created successfully",
    data:user
  })
};
