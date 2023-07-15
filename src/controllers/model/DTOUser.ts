import { AccessibilityAmenity, VerificationStatus } from "@model";
import { DTOAddress } from "./common/DTOAddress";

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
  bahnCard?: string; //TODO enum
  disabilityVerification?: DisabilityVerification;
  createdAt: Date;
  accessibilityAmenities?: AccessibilityAmenity[];
}
