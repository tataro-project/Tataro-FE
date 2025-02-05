import { z } from 'zod';
import profileSchema from './schemas';

type ProfileData = z.infer<typeof profileSchema>;

export default ProfileData;
