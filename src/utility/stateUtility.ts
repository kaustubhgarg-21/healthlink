import FormState from "../core/states/formState";

export const fulfilledState = (): FormState => {
  const formState: FormState = {
    loading: false,
    isSuccess: true,
    isError: false,
    errorStack: null,
  };

  return formState;
};

export const errorState = (message: string, stackTrace?: string): FormState => {
  const formState: FormState = {
    loading: false,
    isSuccess: false,
    isError: true,
  };

  return formState;
};

export const rejectedState = (message?: string): FormState => {
  const formState: FormState = {
    loading: false,
    isError: true,
    isSuccess: false,
    errorStack: message
      ? message
      : null,
  };
  return formState;
};

export const pendingState = (): FormState => {
  const formState: FormState = {
    loading: true,
    isSuccess: false,
    isError: false,
    errorStack: null,
  };
  return formState;
};

export const resetState = (): FormState => {
  const formState: FormState = {
    loading: false,
    isSuccess: false,
    isError: false,
    errorStack: null,
  };
  return formState;
};
