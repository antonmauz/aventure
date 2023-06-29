import { VerificationStatus } from "@model";
import { DTOAddress } from "./DTOAddress";

interface DisabilityVerification {
  idImage: string;
  userImage: string;
  status: VerificationStatus;
}

export interface DTOUser {
  id: string;
  firstName: string;
  surname: string;
  email: string;
  address?: DTOAddress;
  profileImage?: string;
  dateOfBirth?: Date;
  disabilityVerification?: DisabilityVerification;
  createdAt: Date;
}
