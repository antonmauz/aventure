import { DTOUser } from "../DTOUser";

export interface DTOAuthor {
  userId: DTOUser["id"];
  name: string;
  isVerified: boolean;
  profileImage: DTOUser["profileImage"];
}
