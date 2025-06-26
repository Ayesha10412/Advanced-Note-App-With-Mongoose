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
