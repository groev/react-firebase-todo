interface List {
  id: string;
  title: string;
  items: ListItem[];
  order: number;
  user?: string;
}

interface ListItem {
  id: string;
  title: string;
  completed: boolean;
}
