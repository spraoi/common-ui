import { REGEXES, UUID_PREFIXES } from './constants';

const testUserId = value =>
  new RegExp(`^${UUID_PREFIXES.USER}${REGEXES.UUID}$`).test(value);

export default testUserId;
