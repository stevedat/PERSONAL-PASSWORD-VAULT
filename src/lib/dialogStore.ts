import { writable } from "svelte/store";

export type DialogType = "alert" | "confirm" | "prompt";
export type PromptInputType = "text" | "password";

export interface DialogOptions {
  title: string;
  message: string;
  type: DialogType;
  inputType?: PromptInputType;
  defaultValue?: string;
  resolve?: (value: any) => void;
}

const createDialogStore = () => {
  const { subscribe, set, update } = writable<DialogOptions | null>(null);

  // Queue to handle multiple dialogs
  const queue: DialogOptions[] = [];
  let isShowing = false;

  const processQueue = () => {
    if (!isShowing && queue.length > 0) {
      isShowing = true;
      const nextDialog = queue.shift()!;
      set(nextDialog);
    }
  };

  const closeDialog = () => {
    set(null);
    isShowing = false;
    // Small delay before showing next dialog
    setTimeout(processQueue, 150);
  };

  return {
    subscribe,
    alert: (title: string, message: string): Promise<void> => {
      return new Promise((resolve) => {
        queue.push({
          title,
          message,
          type: "alert",
          resolve: () => {
            closeDialog();
            resolve();
          },
        });
        processQueue();
      });
    },
    confirm: (title: string, message: string): Promise<boolean> => {
      return new Promise((resolve) => {
        queue.push({
          title,
          message,
          type: "confirm",
          resolve: (result: boolean) => {
            closeDialog();
            resolve(result);
          },
        });
        processQueue();
      });
    },
    prompt: (
      title: string,
      message: string,
      defaultValue: string = "",
      inputType: PromptInputType = "text"
    ): Promise<string | null> => {
      return new Promise((resolve) => {
        queue.push({
          title,
          message,
          type: "prompt",
          defaultValue,
          inputType,
          resolve: (result: string | null) => {
            closeDialog();
            resolve(result);
          },
        });
        processQueue();
      });
    },
    resolveCurrent: (value: any) => {
      update((current) => {
        if (current && current.resolve) {
          current.resolve(value);
        }
        return current;
      });
    },
  };
};

export const Dialog = createDialogStore();
