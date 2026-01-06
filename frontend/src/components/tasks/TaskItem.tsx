/**
 * Task item component with actions.
 */
"use client";

import { useState } from "react";
import { TaskRead } from "@/types/task";
import { useToggleTask, useDeleteTask } from "@/hooks/useTasks";
import { Button } from "@/components/ui";

interface TaskItemProps {
  task: TaskRead;
  onEdit: (task: TaskRead) => void;
}

export function TaskItem({ task, onEdit }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const toggleTask = useToggleTask();
  const deleteTask = useDeleteTask();

  const handleToggle = () => {
    toggleTask.mutate(task);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await deleteTask.mutateAsync(task.id);
      } catch (error) {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div
      className={`group bg-white border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
        task.completed ? "opacity-75" : ""
      } ${isDeleting ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          disabled={toggleTask.isPending || isDeleting}
          className="mt-1 flex-shrink-0"
        >
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? "bg-primary-600 border-primary-600"
                : "border-gray-300 hover:border-primary-500"
            }`}
          >
            {task.completed && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            )}
          </div>
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium text-gray-900 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`mt-1 text-sm text-gray-600 ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.description}
            </p>
          )}
          <p className="mt-2 text-xs text-gray-400">
            {new Date(task.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            disabled={isDeleting}
            className="text-primary-600 hover:bg-primary-50"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            isLoading={isDeleting}
            disabled={isDeleting}
            className="text-red-600 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
