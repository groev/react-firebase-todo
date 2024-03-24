interface List {
  id: string;
  title: string;
  items: ListItem[];
  order: number;
}

interface ListItem {
  id: string;
  title: string;
  completed: boolean;
}
