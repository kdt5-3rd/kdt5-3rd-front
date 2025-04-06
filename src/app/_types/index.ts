export interface Task {
  task_id: number;
  title: string;
  memo: string;
  start_time: string;
  end_time: string;
  address: string;
  place_name: string;
  location: { lat: string; lng: string };
  is_completed: boolean;
}
