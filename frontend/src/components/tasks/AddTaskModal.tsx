/**
 * Add task modal component.
 */
"use client";

import { useState, FormEvent } from "react";
import { useCreateTask } from "@/hooks/useTasks";
import { Button, Input } from "@/components/ui";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createTask = useCreateTask();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    if (title.length > 500) {
      setErrors({ title: "Title must be less than 500 characters" });
      return;
    }

    try {
      await createTask.mutateAsync({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      // Reset form and close
      setTitle("");
      setDescription("");
      onClose();
    } catch (error: any) {
      setErrors({ submit: error.message || "Failed to create task" });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={createTask.isPending}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={errors.title}
            placeholder="Enter task title"
            required
            disabled={createTask.isPending}
            autoFocus
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description (optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add more details about your task"
              disabled={createTask.isPending}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base transition-colors focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50"
              rows={3}
            />
          </div>

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {errors.submit}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={createTask.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={createTask.isPending}
              disabled={createTask.isPending}
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
