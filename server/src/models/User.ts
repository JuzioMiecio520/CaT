import { model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  token: string;
  username: string;
  password: string;
  createdAt: Date;
  permissions: string[];
}

const schema = new Schema<IUser>({
  _id: String,
  token: String,
  username: String,
  password: String,
  createdAt: Date,
  permissions: Array<String>,
});

export default model("User", schema);
