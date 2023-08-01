import { Injectable, Inject} from "@nestjs/common";
import { User } from "./intarfaces/users.interface";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private usersModule: Model<User>) { }

  async getAll(): Promise<User[]> {
    return this.usersModule.find().exec();
}

async getByIdUser(id: string): Promise<User> {
    return this.usersModule.findById(id)
}

async findUserByLogin(login: string): Promise<User> {
    return this.usersModule.findOne({ login })
}


  
async createUser(user: User): Promise<User> {
  const newUser = new this.usersModule(user); 
  newUser.password=await bcrypt.hash(user.password, 10);
  return await newUser.save();
}


// async remove(id: string) {
//     return await this.usersModule.destroy( {
//         where: {
//             id: id
//         }
//     });
// }

// async edit(id: any, userDto: UpdateUserDto){  
//     const user = await this.usersModule.findByPk(id);
//     user.firstName = userDto.firstName;
//     user.lastName = userDto.lastName;
//     return await user.save();
// }   

}
