export interface Task {
  task_id: number;
  title: string;
  memo: string;
  address: string;
  place_name: string;
  location: { lat: string; lng: string };
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
