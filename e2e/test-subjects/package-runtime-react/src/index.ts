import { createRuntimeBindings } from "@leanjs/react";
import { createRuntime } from "@leanjs/e2e-test-subjects-package-runtime-shared";

export { createRuntime };

export const {
  useGetter,
  useSetter,
  useLoading,
  useError,
  useRuntime,
  HostProvider,
} = createRuntimeBindings(createRuntime);
