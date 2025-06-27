export interface INote {
  title: string;
  content: SVGStringList;
  category: "personal" | "work" | "study" | "other";
  pinned: boolean;
  tags: {
    label: string;
    color: string;
  };
}
export interface IUserNote {
  name: string;
  email: string;
  createdAt: {
    type: Date;
  };
}
