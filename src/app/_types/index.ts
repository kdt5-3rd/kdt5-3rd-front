export interface Task {
  task_id: number;
  title: string;
  memo: string;
  address: string;
  place_name: string;
  latitude: number;
  longitude: number;
  from_lat: number;
  from_lng: number;
  from_address: string;
  from_place_name: string;
  route_option: string;
  is_completed: boolean;
}

export interface TaskPayload extends Task {
  start_time: string;
  end_time: string;
}

export interface TaskCalendar extends Task {
  start_time: Date;
  end_time: Date;
}

export interface TaskCalendarAllDay extends TaskCalendar {
  allDay?: boolean;
}
