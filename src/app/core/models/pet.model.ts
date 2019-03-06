export enum IPetStatus {
  PENDING = 'pending',
  AVAILABLE = 'available',
  SOLD = 'sold',
}

interface IPetCategory {
  id: number;
  name: string;
}

export interface IPet {
  id: number;
  name: string;
  photoUrls: string[];
  status: IPetStatus;
  category: IPetCategory;
}
