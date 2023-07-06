import { DTOUser } from "../DTOUser";

export interface DTOAuthor {
  name: string;
  isVerified: boolean;
  profileImage: DTOUser["profileImage"];
}
