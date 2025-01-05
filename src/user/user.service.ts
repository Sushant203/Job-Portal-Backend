import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './DTO/users.dto';
import { DeleteResult, RelationQueryBuilder, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }
    // checks the validity between the entity and dto and saves the userData to the repository
    async create(createUserDTO: createUserDTO): Promise<User> {
        const userData = this.userRepository.create(createUserDTO);
        return this.userRepository.save(userData);
    }
    async findAll(): Promise<User[]> {
        return this.userRepository.find();

    }

    //find single user by id 
    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    //update the user table

    async update(id: number, updateUserDto: Partial<createUserDTO>): Promise<User> {
        const user = await this.findOne(id); //to check for existing user
        Object.assign(user, updateUserDto);//merge the updates into existing user
        return this.userRepository.save(user);
    }

    //delete user
    async delete(id: number): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

}
