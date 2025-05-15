import ToDoTask from '../ToDoTask/ToDoTask';
import InPrograssTask from '../InPrograssTask/InPrograssTask';
import CompletedTask from '../CompletedTask/CompletedTask';
export default function AllTasks() {
  return (
    <div className="grid grid-rows-[1fr_1fr_1fr] grid-cols-1 gap-y-5 md:grid-rows-[1fr_1fr] md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr] lg:grid-rows-1 gap-x-2 w-full ">
      <ToDoTask />
      <InPrograssTask />
      <CompletedTask />
    </div>
  );
}
