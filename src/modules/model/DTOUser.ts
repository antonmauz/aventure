import { VerificationStatus } from "./VerificationStatus";

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
  birthday?: Date;
  disabilityVerification?: DisabilityVerification;
}
