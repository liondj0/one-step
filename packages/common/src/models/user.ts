import {BaseModel} from "./base-model";


export class User extends BaseModel {

  email!: string;

  firstName!: string;
  lastName!: string;

  profilePicture?: string;

}
