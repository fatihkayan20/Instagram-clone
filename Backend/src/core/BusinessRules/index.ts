import { Result } from '../result/Result';
import { SuccessResult } from '../result/SuccessResult';
export const Run = async (
  rules: (Result | Promise<Result>)[],
): Promise<Result> => {
  const results = await Promise.all(
    rules.map(async (rule) => {
      if (rule instanceof Promise) {
        return await rule;
      }
      return rule;
    }),
  );

  const error = results.find((result) => !result.success);

  return error || new SuccessResult();
};
