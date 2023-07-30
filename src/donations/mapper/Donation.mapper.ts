import { Donation } from '../../database/entities/donation.entity';

export const createDonationMapper = (data: Donation) => {
  return {
    count: data.count,
    displayName: data.displayName,
    email: data.email,
    mobile: data.mobile,
    team: data.team,
    message: data.message,
  };
};
