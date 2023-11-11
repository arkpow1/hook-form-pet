import React from "react";
import "./App.css";
import useForm from "./form/useForm";
import useFormContext from "./form/useFormContext";
import FormProvider from "./form/FormProvider";

function ChildComponent() {
  const methods = useFormContext();

  return (
    <div>
      <select {...methods.register("select")} className="w-full">
        <option value="someOption">Some option</option>
        <option value="otherOption">Other option</option>
      </select>
    </div>
  );
}

function App() {
  const methods = useForm();

  console.log(methods.watch(["test", "select"]));

  return (
    <div>
      <FormProvider {...methods}>
        <form
          {...methods.handleSubmit((test) => console.log(test))}
          className="flex flex-col gap-8 p-8 border-2 border-white"
        >
          <input type="text" {...methods.register("test")} />
          <textarea {...methods.register("area")} cols="30" rows="5" />
          <ChildComponent />
          <button
            type="button"
            onClick={() => methods.setValue("test", "value from setValue")}
          >
            SET VALUE
          </button>
          <button type="button" onClick={() => methods.setFocus("test")}>
            SET FOCUS
          </button>
          <button type="button" onClick={() => methods.reset()}>
            RESET ALL
          </button>
          <button
            type="button"
            onClick={() => methods.reset({ test: "reset value" })}
          >
            RESET INPUT
          </button>
          <button type="submit">Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}

export default App;
