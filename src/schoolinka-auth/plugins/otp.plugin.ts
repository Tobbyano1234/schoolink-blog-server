import random from 'random';

import { tempStore } from '../../famwork-storage';
import { toMinutes } from '../../famwork-shared/time';


export const issueOtp = async (
  email: string,
  expirationTime = 600,
  manualOtp?: number,
) => {
  const otp = manualOtp || random.int(100000, 1000000);
  await tempStore.set(email, `${otp}`, expirationTime);
  return {
    emailOtp: otp.toString(),
    timeLeft: toMinutes(expirationTime),
  };
};

export const verifyOtp = async (
  email: string,
  otp: string,
  keepAlive = false
): Promise<boolean> => {
  const emailOtp = await tempStore.get(email);
  if (emailOtp !== otp) return false;
  // To prevent the otp from being used twice, reset the otp.
  if (!keepAlive) await issueOtp(email);
  return true;
};
