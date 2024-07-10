import React, { FC } from "react";
import { FieldErrors } from "react-hook-form";

interface BMInputTypes
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  register?: any;
  name: string;
  labelText?: string;
  containerClassName?: string;
  errors?: FieldErrors<any>;
}

const BMInput: FC<BMInputTypes> = ({
  register,
  name,
  labelText,
  containerClassName,
  errors,
  ...rest
}) => {
  return (
    <div className={`w-full   ${containerClassName}`}>
      {labelText ? (
        <div className="flex min-w-[30%]">
          <label className=" flex mb-1 ">{labelText}</label>
        </div>
      ) : null}
      <div className="flex flex-col w-full">
        <div className=" w-full">
          <input
            {...register(name)}
            className="flex w-[100%]   flex-col  border-secondary-700 focus:outline-none focus:border-success-500"
            {...rest}
          />
        </div>
        {errors ? (
          <p className="text-xs mt-1 text-primary-500">
            {errors?.message?.toString()}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BMInput;
