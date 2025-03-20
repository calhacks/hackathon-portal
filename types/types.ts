export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  major: string;
  graduationYear: number;
  github: string;
  linkedin: string;
};

export type Application = {
  // Profile information
  profile: Profile;
  // Essay questions
  essay1: string;
  essay2: string;
  essay3: string;
};

export type ApplicationData = {
  id: number;
  created_at: string;
  user_id: string;
  profile_id: number;
  why_participate: string;
  project_idea: string;
  ai_experience: string;
  status?: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
    university: string;
    major: string;
    graduation_year: number;
  };
};
