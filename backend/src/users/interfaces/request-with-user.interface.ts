export interface RequestWithUser extends Request {
  user: { email: string; role: string; _id: string };
}
