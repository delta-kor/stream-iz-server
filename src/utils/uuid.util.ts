import crypto from 'crypto';

export default function uuid(length: number) {
  return crypto.randomBytes(length / 2).toString('hex');
}
