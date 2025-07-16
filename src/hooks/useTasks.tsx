import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Tables } from '@/integrations/supabase/types';

type Task = Tables<'tasks'>;
type TaskWithProject = Task & {
  projects: {
    name: string;
  } | null;
};

export function useTasks() {
  const [tasks, setTasks] = useState<TaskWithProject[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          projects (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (
    title: string, 
    description: string, 
    projectId: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { data: task, error } = await supabase
        .from('tasks')
        .insert({
          title,
          description,
          project_id: projectId,
          created_by: user.id,
          priority,
        })
        .select()
        .single();

      if (error) throw error;

      await fetchTasks();
      
      toast({
        title: "Success",
        description: "Task created successfully",
      });

      return { data: task, error: null };
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      await fetchTasks();
      
      toast({
        title: "Success",
        description: "Task updated successfully",
      });

      return { error: null };
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
      return { error };
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    refetch: fetchTasks,
  };
}