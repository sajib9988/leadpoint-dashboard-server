// src/app/modules/teamMember/teamMember.interface.ts
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
  // avatar: বাদ দিলেও চলবে কারণ এটা service এ path থেকে ইনজেক্ট হচ্ছে
}



















export interface ITeamMemberUpdate {
  name?: string;
  role?: string;
  bio?: string;
  dataAiHint?: string;
  socials?: any; // You can define a proper type for better validation
}
