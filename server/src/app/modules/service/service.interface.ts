// src/app/modules/service/service.interface.ts

export interface IServiceInput {
  title: string;
  shortDescription: string;
  longDescription: string;
  slug: string;
  dataAiHint: string;
    icon?: string;
    image?: string;
}

export interface IServiceUpdate {
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  slug?: string;
  dataAiHint?: string;
}
