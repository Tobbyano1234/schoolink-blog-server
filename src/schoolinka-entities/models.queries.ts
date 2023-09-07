// import { BuildOptions, Optional, QueryOptions } from "sequelize";
// import { ModelNames, ModelTypeMap, User } from ".";

// export interface QueryInterface {
//     modelName:ModelNames;
//     filter?:any;
//     update?:any;
//     options?: QueryOptions;
// }

// User.create({firstName:"wer", lastName:'dnf'})

// import { Sequelize, Model, FindOptions, Includeable, UpdateOptions, DestroyOptions } from 'sequelize';

// export class QueryService<T extends ModelNames> {
//      private model: typeof Model & { new(values?: object, options?: BuildOptions): ModelTypeMap[T] };

//   constructor(modelName: T, private sequelize: Sequelize) {
//     this.model = sequelize.models[modelName] as typeof Model & { new(values?: object, options?: BuildOptions): ModelTypeMap[T] };
//   }

//   async create(data: Optional<ModelTypeMap[T]["_creationAttributes"], keyof ModelTypeMap[T]["_creationAttributes"]>): Promise<ModelTypeMap[T]> {
//     return this.model.create(data);
//   }

//   async read(id: string, relations?: Includeable | Includeable[]): Promise<ModelTypeMap[T] | null> {
//     const options: FindOptions = {
//       where: { id },
//       include: relations ? (Array.isArray(relations) ? relations : [relations]) : undefined
//     };

//     return this.model.findOne(options);
//   }

//   async update(id: string, data: Partial<ModelTypeMap[T]>): Promise<[string, ModelTypeMap[T][]]> {
//     const options: UpdateOptions = {
//       where: { id },
//       returning: true
//     };

//     return this.model.update(data, options);
//   }

//   async delete(id: string): Promise<string> {
//     const options: DestroyOptions = {
//       where: { id }
//     };

//     return this.model.destroy(options);
//   }

//   async filter(field: keyof ModelTypeMap[T], value: any, relations?: Includeable | Includeable[]): Promise<ModelTypeMap[T][]> {
//     const options: FindOptions = {
//       where: { [field]: value },
//       include: relations ? (Array.isArray(relations) ? relations : [relations]) : undefined
//     };

//     return this.model.findAll(options);
//   }
// }

// // Usage:
// const userService = new QueryService(ModelNames.USER, sequelize);
// userService.create({ username: 'john_doe', password: 'password' }); // Create a new user
// userService.read(1, { association: 'roles' }); // Fetch a user with related roles
// userService.read(1); // Fetch a user without related data
// userService.update(1, { username: 'jane_doe' }); // Update a user's username
// userService.delete(1); // Delete a user
// userService.filter('username', 'john_doe', { association: 'roles' }); // Fetch users by username with related roles
// userService.filter('username', 'john_doe'); // Fetch users by username without related data
