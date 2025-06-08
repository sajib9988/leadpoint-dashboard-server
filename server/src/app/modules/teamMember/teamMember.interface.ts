
export interface ITeamMemberInput {
  id: string;
  name: string;
  role: string;
  bio: string;
  dataAiHint: string;
  socials: {
    platform: string;
    url: string;
  }[];
}



















export interface ITeamMemberUpdate {
  name?: string;
  role?: string;
  bio?: string;
  dataAiHint?: string;
  socials?: any; // You can define a proper type for better validation
}
